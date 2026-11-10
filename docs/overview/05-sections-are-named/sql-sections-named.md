# SQL: Sections Named


[Download report XML](/moodle-baselines/assets/gitbook/05min-standards-sections-named.xml){download}


```
SELECT
  z.rowhtml AS "Row"
FROM (
  SELECT
    CONCAT(
      /* Row wrapper with highlight */
      CASE
        /* Hidden sections: OK (green) */
        WHEN (
          cs.visible = 0
          OR (cs.availability IS NOT NULL AND cs.availability LIKE '%hidden%')
        )
        THEN '<div class="d-flex border-bottom px-3 py-2 align-items-center" style="background-color:#e8f5e9">'

        /* Visible but confusing/blank name: ALERT (yellow) */
        WHEN (
          cs.name IS NULL
          OR TRIM(cs.name) = ''
          OR LOWER(TRIM(cs.name)) LIKE '%edit title%'
          OR LOWER(TRIM(cs.name)) LIKE 'section%'
          OR LOWER(TRIM(cs.name)) LIKE 'topic%'
        )
        THEN '<div class="d-flex border-bottom px-3 py-2 align-items-center" style="background-color:#fff3cd">'

        /* Otherwise: visible + properly named = OK (green) */
        ELSE '<div class="d-flex border-bottom px-3 py-2 align-items-center" style="background-color:#e8f5e9">'
      END,

      /* Section number */
      '<div class="text-center me-3 fw-semibold" style="width: 3rem">',
        cs.section,
      '</div>',

      /* Edit (wrench) column: only for ALERT rows */
      '<div class="text-center me-3" style="width: 2.5rem">',
        CASE
          WHEN NOT (
            cs.visible = 0
            OR (cs.availability IS NOT NULL AND cs.availability LIKE '%hidden%')
          )
          AND (
            cs.name IS NULL
            OR TRIM(cs.name) = ''
            OR LOWER(TRIM(cs.name)) LIKE '%edit title%'
            OR LOWER(TRIM(cs.name)) LIKE 'section%'
            OR LOWER(TRIM(cs.name)) LIKE 'topic%'
          )
          THEN CONCAT(
            '<a href="', '%%WWWROOT%%/course/editsection.php?id=', cs.id,
            '" class="text-muted" title="Edit this section" target="_blank">',
              '<i class="fa fa-wrench"></i>',
            '</a>'
          )
          ELSE ''
        END,
      '</div>',

      /* Section title link */
      '<div class="flex-grow-1">',
        '<a href="', '%%WWWROOT%%/course/view.php?id=', %%COURSEID%%, '#section-', cs.section,
        '" class="text-decoration-none',
          CASE
            WHEN (cs.visible = 0 OR (cs.availability IS NOT NULL AND cs.availability LIKE '%hidden%'))
            THEN ' text-muted'
            ELSE ''
          END,
        '" target="_blank">',

          COALESCE(NULLIF(TRIM(cs.name), ''), 'Section name not updated'),

          /* Hidden icon if hidden */
          CASE
            WHEN (cs.visible = 0 OR (cs.availability IS NOT NULL AND cs.availability LIKE '%hidden%'))
            THEN ' <i class="fa fa-eye-slash text-muted" aria-hidden="true" title="Hidden from students"></i>'
            ELSE ''
          END,

          /* Alert icon if visible + confusing/blank name */
          CASE
            WHEN NOT (cs.visible = 0 OR (cs.availability IS NOT NULL AND cs.availability LIKE '%hidden%'))
           AND (
             cs.name IS NULL
             OR TRIM(cs.name) = ''
             OR LOWER(TRIM(cs.name)) LIKE '%edit title%'
             OR LOWER(TRIM(cs.name)) LIKE 'section%'
             OR LOWER(TRIM(cs.name)) LIKE 'topic%'
           )
            THEN ' <i class="fa fa-exclamation-triangle text-dark ms-2" aria-hidden="true" title="Section name needs attention"></i>'
            ELSE ''
          END,

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
    <h3 class="h6 mb-1">Sections Needing Better Titles</h3>
    <p class="text-muted small mb-0">This report lists sections whose titles are
      empty, placeholders, or still using default names such as "Section 1" or
      "Topic 2". Sections in green are either hidden, or clearly named. With an
      alert icon have been identified as needing a clearer name. You can use the
      spanner icon to directly edit that section title.  <a
        href="https://uelac.sharepoint.com/sites/centreforexcellenceinlearningandteaching591/SitePages/05-Sections-are-Named.aspx"
        target="_blank" rel="noopener">Click here to view the guide for this
        report</a>.</p>
  </div>
  <div class="card-body p-0"><!-- Header row -->
    <div class="d-flex fw-bold border-bottom px-3 py-2 bg-light">
      <div class="text-center me-3" style="width: 3rem;">#</div>
      <div class="flex-grow-1">Sections needing titles</div>
    </div>
  </div>
</div>
```

## Template Record

```
<p>[[Row]]</p>
```
