# SQL: Profile Picture


[Download report XML](/moodle-baselines/assets/gitbook/03-min-standards-profile-picture.xml){download}


```
SELECT
  z.editingteacher  AS "Editing teacher",
  z.logentries      AS "Log entries (last 2 months)",
  z.profilepicture  AS "Profile picture"
FROM (

  /* 1) ALERT: no editing teachers */
  SELECT
    CONCAT(
      '<div class="alert alert-warning mb-0 w-100">',
      'There appears to be no <b>Primary Instructor</b> assigned to this course. ',
      'Please contact systemcourse@uel.ac.uk to add yourself as the module leader if you are the main contact for this module.<br>',
      '<a href="https://www.youtube.com/watch?v=ul8naHFPBAQ" target="_blank">',
      'Watch this video for more information...',
      '</a>',
      '</div>'
    ) AS editingteacher,
    NULL AS logentries,
    ''   AS profilepicture,
    0    AS sortkey,
    ''   AS sortlastname,
    ''   AS sortfirstname
  WHERE
    (SELECT COUNT(1)
     FROM {context} ctxp
     JOIN {role_assignments} rap ON rap.contextid = ctxp.id
     JOIN {role} rp              ON rp.id = rap.roleid
     JOIN {user} up              ON up.id = rap.userid
     WHERE ctxp.contextlevel = 50
       AND ctxp.instanceid = %%COURSEID%%
       AND rp.shortname = 'editingteacher'
       AND up.deleted = 0
       AND up.suspended = 0
    ) = 0

  UNION ALL

  /* 2) ALERT: editing teachers exist, but none have profile pictures */
  SELECT
    CONCAT(
      '<div class="alert alert-info mb-0 w-100">',
      'This report cannot see any <b>Primary Instructor</b> with a profile picture. ',
      'This can make it harder for students to engage (it makes things seem more impersonal).  Click on the editing icon next to your own name to add a profile image, or watch this video to see how to add a profile picture...<br>',
      '<a href="https://www.youtube.com/watch?v=ul8naHFPBAQ" target="_blank">',
      'Watch this video for more information...',
      '</a>',
      '</div>'
    ) AS editingteacher,
    NULL AS logentries,
    ''   AS profilepicture,
    0    AS sortkey,
    ''   AS sortlastname,
    ''   AS sortfirstname
  WHERE
    (SELECT COUNT(1)
     FROM {context} ctxp
     JOIN {role_assignments} rap ON rap.contextid = ctxp.id
     JOIN {role} rp              ON rp.id = rap.roleid
     JOIN {user} up              ON up.id = rap.userid
     WHERE ctxp.contextlevel = 50
       AND ctxp.instanceid = %%COURSEID%%
       AND rp.shortname = 'editingteacher'
       AND up.deleted = 0
       AND up.suspended = 0
    ) > 0
  AND
    (SELECT COUNT(1)
     FROM {context} ctxp
     JOIN {role_assignments} rap ON rap.contextid = ctxp.id
     JOIN {role} rp              ON rp.id = rap.roleid
     JOIN {user} up              ON up.id = rap.userid
     WHERE ctxp.contextlevel = 50
       AND ctxp.instanceid = %%COURSEID%%
       AND rp.shortname = 'editingteacher'
       AND up.deleted = 0
       AND up.suspended = 0
       AND up.picture > 0
    ) = 0

  UNION ALL

  /* 3) NORMAL ROWS */
  SELECT
    CASE
      WHEN u.id = %%USERID%% THEN CONCAT(
        '<a href="', '%%WWWROOT%%/user/editadvanced.php?id=', u.id,
        '&course=', %%COURSEID%%,
        '&returnto=profile"',
        ' target="_blank" class="text-decoration-none">',
        u.firstname, ' ', u.lastname,
        ' <i class="fa fa-pencil text-muted ms-1" aria-hidden="true" title="Edit your profile"></i>',
        '</a>'
      )
      ELSE CONCAT(u.firstname, ' ', u.lastname)
    END AS editingteacher,

    COUNT(l.id) AS logentries,

    CASE
      WHEN u.picture > 0 THEN CONCAT(
        '<img src="', '%%WWWROOT%%/user/pix.php/', u.id, '/f2"',
        ' class="rounded-circle" width="40" height="40" alt="Profile picture of ',
        u.firstname, '" />'
      )
      ELSE '<span class="text-muted">No profile picture</span>'
    END AS profilepicture,

    1 AS sortkey,
    u.lastname  AS sortlastname,
    u.firstname AS sortfirstname

  FROM {context} ctx
  JOIN {role_assignments} ra ON ra.contextid = ctx.id
  JOIN {role} r              ON r.id = ra.roleid
  JOIN {user} u              ON u.id = ra.userid
  LEFT JOIN {logstore_standard_log} l
    ON l.courseid = ctx.instanceid
   AND l.userid   = u.id
   AND l.timecreated >= UNIX_TIMESTAMP(DATE_SUB(NOW(), INTERVAL 2 MONTH))

  WHERE ctx.contextlevel = 50
    AND ctx.instanceid = %%COURSEID%%
    AND r.shortname = 'editingteacher'
    AND u.deleted = 0
    AND u.suspended = 0

  GROUP BY u.id, u.firstname, u.lastname, u.picture

) z
ORDER BY
  z.sortkey,
  z.logentries DESC,
  z.sortlastname,
  z.sortfirstname

```

## Template Header

```
<div class="card shadow-sm mb-3">
  <div class="card-header bg-light">
    <h3 class="h6 mb-1">Profile Picture Added</h3>
    <p class="text-muted small mb-0">This report shows which module instructors
      have a profile picture added. The minimum standard requirement is based on
      the instructor who has been accessing the module most (assuming this is
      most likely to be the main instructor). When viewing this report, you can
      click your own name or pencil icon to edit your profile.  <a
        href="https://uelac.sharepoint.com/sites/centreforexcellenceinlearningandteaching591/SitePages/03-Profile-Picture.aspx"
        target="_blank" rel="noopener">Click here to view to guide for this
        report</a>.</p>
  </div>
  <div class="card-body p-0"><!-- Header row -->
    <div class="d-flex fw-bold border-bottom px-3 py-2 bg-light">
      <!-- Instructor column (aligned with avatar box + name) -->
      <div class="d-flex align-items-center flex-grow-1">
        <div class="me-2" style="width: 40px; height: 40px;"> </div>
        <div>Instructor</div>
      </div>
      <!-- Log entries -->
      <div class="text-center" style="width: 180px;">Log entries (last 2 months)
      </div>
    </div>
  </div>
</div>
```

## Template Record

```
<div class="d-flex border-bottom px-3 py-2 align-items-center">
  <!-- Profile picture + name (with optional edit icon) -->
  <div class="d-flex align-items-center flex-grow-1">
    <!-- Centre-aligned picture / fallback text -->
    <div class="d-flex justify-content-center align-items-center me-2"
      style="width: 200px; height: 40px;">[[Profile picture]]</div>
    <!-- Name (linked + pencil only for current user) -->
    <div>[[Editing teacher]]</div>
  </div>
  <!-- Log entries -->
  <div class="text-center" style="width: 180px;">[[Log entries (last 2 months)]]
  </div>
</div>
```
