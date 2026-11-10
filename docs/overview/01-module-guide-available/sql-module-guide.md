# SQL: Module Guide


[Download report XML](/moodle-baselines/assets/gitbook/01-min-standards-module-guide.xml){download}


```
SQLSELECT
  Section,
  Name
FROM (

  SELECT
    '' AS Section,
    CONCAT(
      '<div class="alert alert-info mb-0">',
      'Your course page does include a Module Guide, but it is <b>not showing in your ''Welcome & Module Preparation'' section</b>. ',
      'We recommend moving it to this section, as this is where students will be expecting to see it.',
      '</div>'
    ) AS Name,
    0 AS sortkey,
    0 AS sortsection,
    '' AS sortname
  WHERE
    (SELECT COUNT(1)
     FROM {course_modules} cm
     JOIN {modules} m          ON m.id = cm.module
     JOIN {course_sections} cs ON cs.id = cm.section
     LEFT JOIN {page}     pg   ON pg.id = cm.instance AND m.name = 'page'
     LEFT JOIN {resource} rs   ON rs.id = cm.instance AND m.name = 'resource'
     LEFT JOIN {book}     bk   ON bk.id = cm.instance AND m.name = 'book'
     LEFT JOIN {url}      u    ON u.id  = cm.instance AND m.name = 'url'
     LEFT JOIN {folder}   fd   ON fd.id = cm.instance AND m.name = 'folder'
     WHERE cm.course = %%COURSEID%%
       AND cm.visible = 1
       AND cs.visible = 1
       AND (cm.availability IS NULL OR cm.availability NOT LIKE '%hidden%')
       AND (
         LOWER(COALESCE(pg.name, rs.name, bk.name, u.name, fd.name, '')) LIKE '%module guide%'
         OR LOWER(COALESCE(pg.name, rs.name, bk.name, u.name, fd.name, '')) LIKE '%course guide%'
         OR LOWER(COALESCE(pg.name, rs.name, bk.name, u.name, fd.name, '')) LIKE '%module handbook%'
       )
    ) > 0
    AND
    (SELECT COUNT(1)
     FROM {course_modules} cm
     JOIN {modules} m          ON m.id = cm.module
     JOIN {course_sections} cs ON cs.id = cm.section
     LEFT JOIN {page}     pg   ON pg.id = cm.instance AND m.name = 'page'
     LEFT JOIN {resource} rs   ON rs.id = cm.instance AND m.name = 'resource'
     LEFT JOIN {book}     bk   ON bk.id = cm.instance AND m.name = 'book'
     LEFT JOIN {url}      u    ON u.id  = cm.instance AND m.name = 'url'
     LEFT JOIN {folder}   fd   ON fd.id = cm.instance AND m.name = 'folder'
     WHERE cm.course = %%COURSEID%%
       AND cm.visible = 1
       AND cs.visible = 1
       AND (cm.availability IS NULL OR cm.availability NOT LIKE '%hidden%')
       AND (
         LOWER(COALESCE(pg.name, rs.name, bk.name, u.name, fd.name, '')) LIKE '%module guide%'
         OR LOWER(COALESCE(pg.name, rs.name, bk.name, u.name, fd.name, '')) LIKE '%course guide%'
         OR LOWER(COALESCE(pg.name, rs.name, bk.name, u.name, fd.name, '')) LIKE '%module handbook%'
       )
       AND cs.name = 'Welcome & Module Preparation'
    ) = 0

  UNION ALL

  SELECT
    '' AS Section,
    CONCAT(
      '<div class="alert alert-warning mb-0">',
      'Your module guide appears to be hidden from students. ',
      'You need to have a module guide that is visible to students to meet this standard.',
      '</div>'
    ) AS Name,
    0 AS sortkey,
    0 AS sortsection,
    '' AS sortname
  WHERE
    (SELECT COUNT(1)
     FROM {course_modules} cm
     JOIN {modules} m          ON m.id = cm.module
     JOIN {course_sections} cs ON cs.id = cm.section
     LEFT JOIN {page}     pg   ON pg.id = cm.instance AND m.name = 'page'
     LEFT JOIN {resource} rs   ON rs.id = cm.instance AND m.name = 'resource'
     LEFT JOIN {book}     bk   ON bk.id = cm.instance AND m.name = 'book'
     LEFT JOIN {url}      u    ON u.id  = cm.instance AND m.name = 'url'
     LEFT JOIN {folder}   fd   ON fd.id = cm.instance AND m.name = 'folder'
     WHERE cm.course = %%COURSEID%%
       AND (
         LOWER(COALESCE(pg.name, rs.name, bk.name, u.name, fd.name, '')) LIKE '%module guide%'
         OR LOWER(COALESCE(pg.name, rs.name, bk.name, u.name, fd.name, '')) LIKE '%course guide%'
         OR LOWER(COALESCE(pg.name, rs.name, bk.name, u.name, fd.name, '')) LIKE '%module handbook%'
       )
       AND (
         cm.visible = 0
         OR cs.visible = 0
         OR (cm.availability IS NOT NULL AND cm.availability LIKE '%hidden%')
       )
    ) > 0
    AND
    (SELECT COUNT(1)
     FROM {course_modules} cm
     JOIN {modules} m          ON m.id = cm.module
     JOIN {course_sections} cs ON cs.id = cm.section
     LEFT JOIN {page}     pg   ON pg.id = cm.instance AND m.name = 'page'
     LEFT JOIN {resource} rs   ON rs.id = cm.instance AND m.name = 'resource'
     LEFT JOIN {book}     bk   ON bk.id = cm.instance AND m.name = 'book'
     LEFT JOIN {url}      u    ON u.id  = cm.instance AND m.name = 'url'
     LEFT JOIN {folder}   fd   ON fd.id = cm.instance AND m.name = 'folder'
     WHERE cm.course = %%COURSEID%%
       AND (
         LOWER(COALESCE(pg.name, rs.name, bk.name, u.name, fd.name, '')) LIKE '%module guide%'
         OR LOWER(COALESCE(pg.name, rs.name, bk.name, u.name, fd.name, '')) LIKE '%course guide%'
         OR LOWER(COALESCE(pg.name, rs.name, bk.name, u.name, fd.name, '')) LIKE '%module handbook%'
       )
       AND cm.visible = 1
       AND cs.visible = 1
       AND (cm.availability IS NULL OR cm.availability NOT LIKE '%hidden%')
    ) = 0

  UNION ALL

  SELECT
    CONCAT(
      CASE
        WHEN cs.name = 'Welcome & Module Preparation'
        THEN '<span class="text-success me-1" title="Correct section"><i class="fa fa-check" aria-hidden="true"></i></span>'
        ELSE '<span class="text-danger me-1" title="Not in the expected section"><i class="fa fa-times" aria-hidden="true"></i></span>'
      END,
      '<a href="', '%%WWWROOT%%/course/view.php?id=', %%COURSEID%%, '#section-', cs.section,
      '" class="text-decoration-none">',
      COALESCE(NULLIF(cs.name, ''), CONCAT('Section ', cs.section)),
      '</a>'
    ) AS Section,

    CASE
      WHEN cm.visible = 0
           OR cs.visible = 0
           OR (cm.availability IS NOT NULL AND cm.availability LIKE '%hidden%')
      THEN CONCAT(
        '<div class="bg-light px-2 py-1 rounded">',
        '<span class="text-success me-2" title="Matches Module Guide naming"><i class="fa fa-check" aria-hidden="true"></i></span>',
        '<a href="', '%%WWWROOT%%/mod/', m.name, '/view.php?id=', cm.id,
        '" target="_blank" class="text-decoration-none text-muted">',
          CASE
            WHEN m.name = 'page'     THEN '<i class="fa fa-file-alt me-1" aria-hidden="true"></i>'
            WHEN m.name = 'resource' THEN '<i class="fa fa-file me-1" aria-hidden="true"></i>'
            WHEN m.name = 'book'     THEN '<i class="fa fa-book me-1" aria-hidden="true"></i>'
            WHEN m.name = 'url'      THEN '<i class="fa fa-link me-1" aria-hidden="true"></i>'
            WHEN m.name = 'folder'   THEN '<i class="fa fa-folder-open me-1" aria-hidden="true"></i>'
            ELSE '<i class="fa fa-file me-1" aria-hidden="true"></i>'
          END,
          COALESCE(pg.name, rs.name, bk.name, u.name, fd.name, ''),
          ' <i class="icon fa fa-eye-slash text-muted" aria-hidden="true"></i>',
        '</a>',
        '</div>'
      )
      ELSE CONCAT(
        '<span class="text-success me-2" title="Matches Module Guide naming"><i class="fa fa-check" aria-hidden="true"></i></span>',
        '<a href="', '%%WWWROOT%%/mod/', m.name, '/view.php?id=', cm.id,
        '" target="_blank" class="text-decoration-none">',
          CASE
            WHEN m.name = 'page'     THEN '<i class="fa fa-file-alt me-1" aria-hidden="true"></i>'
            WHEN m.name = 'resource' THEN '<i class="fa fa-file me-1" aria-hidden="true"></i>'
            WHEN m.name = 'book'     THEN '<i class="fa fa-book me-1" aria-hidden="true"></i>'
            WHEN m.name = 'url'      THEN '<i class="fa fa-link me-1" aria-hidden="true"></i>'
            WHEN m.name = 'folder'   THEN '<i class="fa fa-folder-open me-1" aria-hidden="true"></i>'
            ELSE '<i class="fa fa-file me-1" aria-hidden="true"></i>'
          END,
          COALESCE(pg.name, rs.name, bk.name, u.name, fd.name, ''),
        '</a>'
      )
    END AS Name,

    1 AS sortkey,
    cs.section AS sortsection,
    COALESCE(pg.name, rs.name, bk.name, u.name, fd.name, '') AS sortname

  FROM {course_modules} cm
  JOIN {modules} m          ON m.id = cm.module
  JOIN {course_sections} cs ON cs.id = cm.section
  LEFT JOIN {page}     pg   ON pg.id = cm.instance AND m.name = 'page'
  LEFT JOIN {resource} rs   ON rs.id = cm.instance AND m.name = 'resource'
  LEFT JOIN {book}     bk   ON bk.id = cm.instance AND m.name = 'book'
  LEFT JOIN {url}      u    ON u.id  = cm.instance AND m.name = 'url'
  LEFT JOIN {folder}   fd   ON fd.id = cm.instance AND m.name = 'folder'
  WHERE cm.course = %%COURSEID%%
    AND (
      LOWER(COALESCE(pg.name, rs.name, bk.name, u.name, fd.name, '')) LIKE '%module guide%'
      OR LOWER(COALESCE(pg.name, rs.name, bk.name, u.name, fd.name, '')) LIKE '%course guide%'
      OR LOWER(COALESCE(pg.name, rs.name, bk.name, u.name, fd.name, '')) LIKE '%module handbook%'
    )

  UNION ALL

  SELECT
    '' AS Section,
    CONCAT(
      '<div class="alert alert-warning mb-0">',
      'This report cannot identify a module guide on your course page. ',
      'Please download the template from ',
      '<a href="https://uelac.sharepoint.com/sites/studenthandbooks/ModuleGuides" target="_blank" rel="noopener">',
      'this website</a>',
      ', and upload a completed Module Guide to your course page.',
      '</a>',
      '</div>'
    ) AS Name,
    0 AS sortkey,
    1 AS sortsection,
    '' AS sortname
  WHERE
    (SELECT COUNT(1)
     FROM {course_modules} cm
     JOIN {modules} m          ON m.id = cm.module
     JOIN {course_sections} cs ON cs.id = cm.section
     LEFT JOIN {page}     pg   ON pg.id = cm.instance AND m.name = 'page'
     LEFT JOIN {resource} rs   ON rs.id = cm.instance AND m.name = 'resource'
     LEFT JOIN {book}     bk   ON bk.id = cm.instance AND m.name = 'book'
     LEFT JOIN {url}      u    ON u.id  = cm.instance AND m.name = 'url'
     LEFT JOIN {folder}   fd   ON fd.id = cm.instance AND m.name = 'folder'
     WHERE cm.course = %%COURSEID%%
       AND (
         LOWER(COALESCE(pg.name, rs.name, bk.name, u.name, fd.name, '')) LIKE '%module guide%'
         OR LOWER(COALESCE(pg.name, rs.name, bk.name, u.name, fd.name, '')) LIKE '%course guide%'
         OR LOWER(COALESCE(pg.name, rs.name, bk.name, u.name, fd.name, '')) LIKE '%module handbook%'
       )
    ) = 0

) z
ORDER BY z.sortkey, z.sortsection, z.sortname

```

## Template Header

```
<div class="card shadow-sm mb-3">
  <div class="card-header bg-light">
    <h3 class="h6 mb-1">Module / Course Guides</h3>
    <p class="text-muted small mb-0">This report lists visible items whose names
      contain "module guide", "course guide", or "module handbook". <a
        href="https://uelac.sharepoint.com/sites/centreforexcellenceinlearningandteaching591/SitePages/01-Module-Guide-Available.aspx"
        target="_blank" rel="noopener">Click here to view the guide on this
        report</a>.</p>
  </div>
  <div class="card-body p-0"><!-- Header row -->
    <div class="d-flex fw-bold border-bottom px-3 py-2 bg-light">
      <div class="flex-grow-1">Section</div>
      <div class="flex-grow-1">Resource Name</div>
    </div>
  </div>
</div>
```

## Template Record

```
<div class="d-flex border-bottom px-3 py-2 align-items-center">
  <div class="flex-grow-1">[[Section]]</div>
  <div class="flex-grow-1">[[Name]]</div>
</div>
```
