# SQL: Empty Sections


[Download report XML](/moodle-baselines/assets/gitbook/04-min-standards-empty-sections.xml){download}


```
SELECT
  z.rowhtml AS "Row"
FROM (
  SELECT
    CONCAT(
      /* Row wrapper with background highlight */
      CASE
        /* Hidden (any hidden section) */
        WHEN (cs.visible = 0 OR (cs.availability IS NOT NULL AND cs.availability LIKE '%hidden%'))
          THEN '<div class="d-flex border-bottom px-3 py-2 align-items-center" style="background-color:#e8f5e9">'

        /* Active (has content) */
        WHEN EXISTS (
          SELECT 1
          FROM {course_modules} cm
          WHERE cm.course = cs.course
            AND cm.section = cs.id
            AND cm.deletioninprogress = 0
        )
          THEN '<div class="d-flex border-bottom px-3 py-2 align-items-center" style="background-color:#e8f5e9">'

        /* Empty & Visible (problem) */
        ELSE '<div class="d-flex border-bottom px-3 py-2 align-items-center" style="background-color:#fff3cd">'
      END,

      /* Section number */
      '<div class="text-center me-3 fw-semibold" style="width: 3rem">',
        cs.section,
      '</div>',

      /* Status badges */
      '<div class="me-3" style="width: 12rem">',

        /* Hidden badge (green) */
        CASE
          WHEN (cs.visible = 0 OR (cs.availability IS NOT NULL AND cs.availability LIKE '%hidden%'))
          THEN CONCAT(
            '<span class="badge bg-success text-white me-1">',
            '<i class="icon fa fa-eye-slash text-white me-1" aria-hidden="true"></i>',
            'Hidden</span>'
          )
          ELSE ''
        END,

        /* Active badge (green) */
        CASE
          WHEN EXISTS (
            SELECT 1
            FROM {course_modules} cm1
            WHERE cm1.course = cs.course
              AND cm1.section = cs.id
              AND cm1.deletioninprogress = 0
          )
          THEN '<span class="badge bg-success text-white me-1">Active</span>'
          ELSE ''
        END,

        /* Empty & Visible badge (yellow) */
        CASE
          WHEN NOT (cs.visible = 0 OR (cs.availability IS NOT NULL AND cs.availability LIKE '%hidden%'))
           AND NOT EXISTS (
             SELECT 1
             FROM {course_modules} cm2
             WHERE cm2.course = cs.course
               AND cm2.section = cs.id
               AND cm2.deletioninprogress = 0
           )
          THEN CONCAT(
            '<span class="badge bg-warning text-dark me-1">',
            '<i class="icon fa fa-exclamation-triangle me-1" aria-hidden="true"></i>',
            'Empty & Visible</span>'
          )
          ELSE ''
        END,

      '</div>',

      /* Section link / title */
      '<div class="flex-grow-1">',
        '<a href="', '%%WWWROOT%%/course/view.php?id=', %%COURSEID%%, '#section-', cs.section,
        '" class="text-decoration-none">',
          COALESCE(NULLIF(cs.name, ''), 'Section name not updated'),
        '</a>',
      '</div>',

      '</div>'
    ) AS rowhtml,
    cs.section AS sortsection
  FROM {course_sections} cs
  WHERE cs.course = %%COURSEID%%
    AND cs.section > 0
) z
ORDER BY z.sortsection

```

## Template Header

```
<div class="card shadow-sm mb-3">
  <div class="card-header bg-light">
    <h3 class="h6 mb-1">Empty Sections</h3>
    <p class="text-muted small mb-0">This report lists visible and hidden course
      sections that contain no course modules. Click on the section name to to
      jump directly to the section. <a
        href="https://uelac.sharepoint.com/sites/centreforexcellenceinlearningandteaching591/SitePages/04-Empty-sections.aspx"
        target="_blank" rel="noopener">Click here to view the guide for this
        report.</a></p>
  </div>
  <div class="card-body p-0"><!-- Header row -->
    <div class="d-flex fw-bold border-bottom px-3 py-2 bg-light">
      <div class="text-center me-3" style="width: 3rem;">#</div>
      <div class="me-3" style="width: 12rem;">Status</div>
      <div class="flex-grow-1">Section</div>
    </div>
  </div>
</div>
```

## Template Record

```
<p>[[Row]]</p>
```
