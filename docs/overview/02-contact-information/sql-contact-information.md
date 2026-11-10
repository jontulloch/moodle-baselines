# SQL: Contact Information


[Download report XML](/moodle-baselines/assets/gitbook/02-min-standards-contact-information.xml){download}


```
SELECT
  z.rowhtml AS "Row"
FROM (

  /* 1) Alert row: no Primary Instructor on the course */
  SELECT
    CONCAT(
      '<div class="d-flex border-bottom px-3 py-2">',
        '<div class="w-100">',
          '<div class="alert alert-warning mb-0">',
            'There appears to be no <b>Primary Instructor</b> assigned to this course. ',
            'Please contact systemcourse@uel.ac.uk to add yourself as the module leader if you are the main contact for this module. 
<a href="https://bit.ly/4pIYFfQ">Watch this video for more information',
          '</div>',
        '</div>',
      '</div>'
    ) AS rowhtml,
    0 AS sortkey,
    '' AS sortlastname,
    '' AS sortfirstname
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

  /* 2) Normal rows */
  SELECT
    CONCAT(
      '<div class="d-flex border-bottom px-3 py-2 align-items-center">',
        '<div class="flex-grow-1">',
          '<div class="fw-semibold">', u.firstname, ' ', u.lastname, '</div>',
          '<div class="text-muted small">',
            GROUP_CONCAT(
              DISTINCT
              CASE r.shortname
                WHEN 'editingteacher'      THEN 'Primary Instructor'
                WHEN 'editinginstructornl' THEN 'Instructor'
                WHEN 'teacher'             THEN 'Non-Editing Instructor'
                WHEN 'catadmin'            THEN 'Category Admin'
              END
              ORDER BY r.shortname
              SEPARATOR ', '
            ),
          '</div>',
        '</div>',
'<div style="width:200px" class="d-flex justify-content-center align-items-center">',
          CASE
            WHEN blockcheck.hasvisiblecontactsblock = 0 THEN
              CONCAT(
                '<span title="Check that your contacts block is added and visible to students" ',
                'class="text-danger fw-semibold text-decoration-underline" style="cursor: help">',
                'No contacts block</span>'
              )
            WHEN MAX(CASE WHEN r.shortname = 'editingteacher' THEN 1 ELSE 0 END) = 1 THEN '✔'
            ELSE ''
          END,
        '</div>',
      '</div>'
    ) AS rowhtml,
    1 AS sortkey,
    u.lastname AS sortlastname,
    u.firstname AS sortfirstname

  FROM {context} ctx
  JOIN {course} c            ON c.id = ctx.instanceid
  JOIN {role_assignments} ra ON ra.contextid = ctx.id
  JOIN {role} r              ON r.id = ra.roleid
  JOIN {user} u              ON u.id = ra.userid

  JOIN (
      SELECT
          ctx2.id AS contextid,
          CASE
              WHEN EXISTS (
                  SELECT 1
                  FROM {block_instances} bi
                  WHERE bi.parentcontextid = ctx2.id
                    AND bi.blockname = 'html'
                    AND (bi.pagetypepattern = '*' OR bi.pagetypepattern LIKE 'course-%')
                    AND FROM_BASE64(bi.configdata) LIKE '%Course Contacts%'
              )
              AND NOT EXISTS (
                  SELECT 1
                  FROM {block_instances} bi
                  JOIN {block_positions} bp ON bp.blockinstanceid = bi.id
                  WHERE bi.parentcontextid = ctx2.id
                    AND bi.blockname = 'html'
                    AND (bi.pagetypepattern = '*' OR bi.pagetypepattern LIKE 'course-%')
                    AND FROM_BASE64(bi.configdata) LIKE '%Course Contacts%'
                    AND bp.contextid = ctx2.id
                    AND bp.visible = 0
              )
              THEN 1 ELSE 0
          END AS hasvisiblecontactsblock
      FROM {context} ctx2
      WHERE ctx2.contextlevel = 50
        AND ctx2.instanceid = %%COURSEID%%
  ) blockcheck ON blockcheck.contextid = ctx.id

  WHERE ctx.contextlevel = 50
    AND c.id = %%COURSEID%%
    AND r.shortname IN ('editingteacher', 'editinginstructornl', 'teacher', 'catadmin')
    AND u.deleted = 0
    AND u.suspended = 0

  GROUP BY
      u.id,
      u.firstname,
      u.lastname,
      blockcheck.hasvisiblecontactsblock

) z
ORDER BY z.sortkey, z.sortlastname, z.sortfirstname

```

## Template Header

```
<div class="card shadow-sm mb-3">
  <div class="card-header bg-light">
    <h3 class="h6 mb-1">Course Roles</h3>
    <p class="text-muted small mb-0">This report lists teaching/admin roles in
      this course. The tick indicates a Primary Instructor when the Course
      Contacts block is present.  <a
        href="https://uelac.sharepoint.com/sites/centreforexcellenceinlearningandteaching591/SitePages/02-Contact-information.aspx"
        target="_blank" rel="noopener">Click here to view the guide for this
        report</a>.</p>
  </div>
  <div class="card-body p-0">
    <div class="d-flex fw-bold border-bottom px-3 py-2 bg-light">
      <div class="flex-grow-1">Name and role</div>
      <div class="text-end" style="width: 200px;">Contact Info Visible</div>
    </div>
  </div>
</div>
```

## Template Record

```
<p>[[Row]]</p>
```
