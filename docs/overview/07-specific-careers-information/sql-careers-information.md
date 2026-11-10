# SQL: Careers Information


[Download report XML](/moodle-baselines/assets/gitbook/07-min-standards-careers-information.xml){download}


```
SELECT
  1 AS sortorder,
  CASE
    WHEN cm.visible = 1
     AND (cm.availability IS NULL OR cm.availability NOT LIKE '%hidden%')
    THEN 0
    ELSE 1
  END AS visibility_sort,
  CASE
    WHEN cm.visible = 0
         OR (cm.availability IS NOT NULL AND cm.availability LIKE '%hidden%')
    THEN CONCAT(
      '<div class="alert alert-secondary fw-normal mb-1 py-2 px-3" style="font-weight: normal !important">',
      '<div class="d-flex align-items-center gap-3">',
      '<a href="', '%%WWWROOT%%/course/mod.php', CHAR(63), 'sesskey=%7Bsesskey%7D', CHAR(38), 'show=', cm.id,
      '" class="text-muted me-4" title="Make this resource visible to students">',
      '<i class="fa fa-eye-slash" aria-hidden="true"></i>',
      '</a>',
      '<a href="', '%%WWWROOT%%/mod/', m.name, '/view.php?id=', cm.id,
      '" target="_blank" class="text-decoration-none text-muted" style="font-weight: normal !important">',
      COALESCE(
        NULLIF(
          TRIM(
            CASE
              WHEN m.name = 'label' THEN
                CASE
                  WHEN COALESCE(lb.intro,'') LIKE '%youtube.com/embed%'
                    OR COALESCE(lb.intro,'') LIKE '%youtu.be/%'
                    OR (
                      COALESCE(lb.intro,'') LIKE '%<iframe%'
                      AND COALESCE(lb.intro,'') LIKE '%src=%'
                    )
                  THEN 'Embedded video'
                  WHEN COALESCE(lb.intro,'') LIKE '%href="%' THEN
                    CONCAT(
                      'Link to the resource: ',
                      REGEXP_REPLACE(
                        SUBSTRING_INDEX(
                          REGEXP_REPLACE(
                            TRIM(
                              SUBSTRING(
                                COALESCE(lb.intro,''),
                                LOCATE('href="', COALESCE(lb.intro,'')) + 6,
                                LOCATE('"', COALESCE(lb.intro,''), LOCATE('href="', COALESCE(lb.intro,'')) + 6)
                                  - (LOCATE('href="', COALESCE(lb.intro,'')) + 6)
                              )
                            ),
                            '^(http://|https://)',
                            ''
                          ),
                          '/',
                          1
                        ),
                        '^www\\.',
                        ''
                      )
                    )
                  ELSE
                    CONCAT(
                      TRIM(
                        SUBSTRING_INDEX(
                          REGEXP_REPLACE(COALESCE(lb.intro,''), '<[^>]*>', ' '),
                          ' ',
                          10
                        )
                      ),
                      '...'
                    )
                END
              ELSE
                COALESCE(
                  pg.name,
                  rs.name,
                  bk.name,
                  u.name,
                  fd.name,
                  qz.name,
                  CONCAT('[', m.name, ' #', cm.instance, ']')
                )
            END
          ),
          ''
        ),
        CONCAT('[', m.name, ' #', cm.instance, ']')
      ),
      '</a>',
      '</div>',
      '</div>'
    )
    ELSE CONCAT(
      '<div class="alert alert-success mb-1 py-2 px-3" style="font-weight: normal !important">',
      '<a href="', '%%WWWROOT%%/mod/', m.name, '/view.php?id=', cm.id,
      '" target="_blank" class="text-decoration-none text-dark" style="font-weight: normal !important">',
      COALESCE(
        NULLIF(
          TRIM(
            CASE
              WHEN m.name = 'label' THEN
                CASE
                  WHEN COALESCE(lb.intro,'') LIKE '%youtube.com/embed%'
                    OR COALESCE(lb.intro,'') LIKE '%youtu.be/%'
                    OR (
                      COALESCE(lb.intro,'') LIKE '%<iframe%'
                      AND COALESCE(lb.intro,'') LIKE '%src=%'
                    )
                  THEN 'Embedded video'
                  WHEN COALESCE(lb.intro,'') LIKE '%href="%' THEN
                    CONCAT(
                      'Link to the resource: ',
                      REGEXP_REPLACE(
                        SUBSTRING_INDEX(
                          REGEXP_REPLACE(
                            TRIM(
                              SUBSTRING(
                                COALESCE(lb.intro,''),
                                LOCATE('href="', COALESCE(lb.intro,'')) + 6,
                                LOCATE('"', COALESCE(lb.intro,''), LOCATE('href="', COALESCE(lb.intro,'')) + 6)
                                  - (LOCATE('href="', COALESCE(lb.intro,'')) + 6)
                              )
                            ),
                            '^(http://|https://)',
                            ''
                          ),
                          '/',
                          1
                        ),
                        '^www\\.',
                        ''
                      )
                    )
                  ELSE
                    CONCAT(
                      TRIM(
                        SUBSTRING_INDEX(
                          REGEXP_REPLACE(COALESCE(lb.intro,''), '<[^>]*>', ' '),
                          ' ',
                          10
                        )
                      ),
                      '...'
                    )
                END
              ELSE
                COALESCE(
                  pg.name,
                  rs.name,
                  bk.name,
                  u.name,
                  fd.name,
                  qz.name,
                  CONCAT('[', m.name, ' #', cm.instance, ']')
                )
            END
          ),
          ''
        ),
        CONCAT('[', m.name, ' #', cm.instance, ']')
      ),
      '</a>',
      '</div>'
    )
  END AS Identified_careers_resources
FROM {course_sections} cs
JOIN {course_modules} cm
  ON cm.section = cs.id
  AND cm.deletioninprogress = 0
JOIN {modules} m
  ON m.id = cm.module
LEFT JOIN {page} pg
  ON pg.id = cm.instance
  AND m.name = 'page'
LEFT JOIN {resource} rs
  ON rs.id = cm.instance
  AND m.name = 'resource'
LEFT JOIN {book} bk
  ON bk.id = cm.instance
  AND m.name = 'book'
LEFT JOIN {url} u
  ON u.id = cm.instance
  AND m.name = 'url'
LEFT JOIN {folder} fd
  ON fd.id = cm.instance
  AND m.name = 'folder'
LEFT JOIN {quiz} qz
  ON qz.id = cm.instance
  AND m.name = 'quiz'
LEFT JOIN {label} lb
  ON lb.id = cm.instance
  AND m.name = 'label'
WHERE cs.course = %%COURSEID%%
  AND cs.visible = 1
AND LOWER(TRIM(cs.name)) IN ('career & employability', 'careers & employability')
  AND NOT (
    m.name = 'label'
    AND lb.intro IS NOT NULL
    AND (
      lb.intro LIKE '%employability information specific to this module%'
      OR lb.intro LIKE '%guest speakers, content or link(s)%'
      OR lb.intro LIKE '%/sites/careerzone%'
      OR lb.intro LIKE '%LinkedIn-Learning.aspx%'
    )
  )

UNION ALL

SELECT
  0 AS sortorder,
  0 AS visibility_sort,
  CONCAT(
    '<div class="alert alert-warning mb-1 py-2 px-3">',
    'There are currently no additional careers resources that are visible to students. You can click on the hidden resources below to edit them and make them visible.  Or you can use our ',
    '<a target="_blank" href="https://chatgpt.com/g/g-6964b52f6c0c8191828e4b69e8cc7c1b-module-employability-mapper">dedicated AI resource generator</a>',
    ' for more resources.',
    '</div>'
  ) AS Identified_careers_resources
WHERE
  EXISTS (
    SELECT 1
    FROM {course_sections} cs
    JOIN {course_modules} cm
      ON cm.section = cs.id
      AND cm.deletioninprogress = 0
    JOIN {modules} m
      ON m.id = cm.module
    LEFT JOIN {label} lb
      ON lb.id = cm.instance
      AND m.name = 'label'
    WHERE cs.course = %%COURSEID%%
      AND cs.visible = 1
AND LOWER(TRIM(cs.name)) IN ('career & employability', 'careers & employability')
      AND NOT (
        m.name = 'label'
        AND lb.intro IS NOT NULL
        AND (
          lb.intro LIKE '%employability information specific to this module%'
          OR lb.intro LIKE '%guest speakers, content or link(s)%'
          OR lb.intro LIKE '%/sites/careerzone%'
          OR lb.intro LIKE '%LinkedIn-Learning.aspx%'
        )
      )
  )
  AND NOT EXISTS (
    SELECT 1
    FROM {course_sections} cs
    JOIN {course_modules} cm
      ON cm.section = cs.id
      AND cm.deletioninprogress = 0
    JOIN {modules} m
      ON m.id = cm.module
    LEFT JOIN {label} lb
      ON lb.id = cm.instance
      AND m.name = 'label'
    WHERE cs.course = %%COURSEID%%
      AND cs.visible = 1
AND LOWER(TRIM(cs.name)) IN ('career & employability', 'careers & employability')
      AND NOT (
        m.name = 'label'
        AND lb.intro IS NOT NULL
        AND (
          lb.intro LIKE '%employability information specific to this module%'
          OR lb.intro LIKE '%guest speakers, content or link(s)%'
          OR lb.intro LIKE '%/sites/careerzone%'
          OR lb.intro LIKE '%LinkedIn-Learning.aspx%'
        )
      )
      AND cm.visible = 1
      AND (cm.availability IS NULL OR cm.availability NOT LIKE '%hidden%')
  )

UNION ALL

SELECT
  0 AS sortorder,
  0 AS visibility_sort,
  CONCAT(
    '<div class="alert alert-warning mb-1 py-2 px-3" style="border:1px solid #b8daff background:#d1ecf1 border-radius:6px">',
    'No additional Careers & Employability resources have been added yet.  To add items, you can use our dedicated ',
    '<a target="_blank" href="https://chatgpt.com/g/g-6964b52f6c0c8191828e4b69e8cc7c1b-module-employability-mapper">AI employability resource generator</a>.',
    '</div>'
  ) AS Identified_careers_resources
WHERE NOT EXISTS (
  SELECT 1
  FROM {course_sections} cs
  JOIN {course_modules} cm
    ON cm.section = cs.id
    AND cm.deletioninprogress = 0
  JOIN {modules} m
    ON m.id = cm.module
  LEFT JOIN {label} lb
    ON lb.id = cm.instance
    AND m.name = 'label'
  WHERE cs.course = %%COURSEID%%
    AND cs.visible = 1
AND LOWER(TRIM(cs.name)) IN ('career & employability', 'careers & employability')
    AND NOT (
      m.name = 'label'
      AND lb.intro IS NOT NULL
      AND (
        lb.intro LIKE '%employability information specific to this module%'
        OR lb.intro LIKE '%guest speakers, content or link(s)%'
        OR lb.intro LIKE '%/sites/careerzone%'
        OR lb.intro LIKE '%LinkedIn-Learning.aspx%'
      )
    )
)

ORDER BY sortorder, visibility_sort
```

## Template Header

```
<div class="card shadow-sm mb-3">
  <div class="card-header bg-light">
    <h3 class="h6 mb-1">Careers &amp; Employability Resources</h3>
    <p class="text-muted small mb-0">This report lists resources in the
      <strong>Career &amp; Employability</strong> section of the course. Hidden
      items are shown with a grey background and marked as hidden. Use the Open
      link to view each resource. <a
        href="https://uelac.sharepoint.com/sites/centreforexcellenceinlearningandteaching591/SitePages/07-Specific-careers-information.aspx"
        target="_blank" rel="noopener">Click here to view the guide for this
        report</a>.</p>
  </div>
  <div class="card-body p-0"><!-- Header row -->
    <div class="d-flex fw-bold border-bottom px-3 py-2 bg-light">
      <div class="flex-grow-1">Identified careers resources</div>
    </div>
  </div>
</div>
```

## Template Record

```
<div class="d-flex border-bottom px-3 py-2 align-items-center">
  <div class="flex-grow-1">[[Identified_careers_resources]]</div>
</div>
```
