# SQL: Summative Links


[Download report XML](/moodle-baselines/assets/gitbook/09-min-standards-assessment-completion-criteria.xml){download}


```
SELECT
CASE
  WHEN (x.cmvisible = 0 OR x.csvisible = 0) THEN 'alert alert-secondary text-dark'
  WHEN x.altformat = 1 THEN 'bg-light text-muted'
  WHEN x.is_af = 0 OR x.completion = 0 OR x.has_formative = 1 THEN 'bg-light text-muted'
  ELSE ''
END AS "Row class",

  CASE
    WHEN x.is_af = 1 AND x.completion <> 0 AND x.has_formative = 0 THEN 0
    ELSE 1
  END AS sortbucket,

  x.sectionnum,
  x.modname,
  x.sortname,

  CONCAT(
    '<div class="d-flex border-bottom px-3 py-2 align-items-center ',
      CASE
        WHEN (x.cmvisible = 0 OR x.csvisible = 0) THEN 'alert alert-secondary text-dark'
        WHEN x.altformat = 1 THEN 'bg-light text-muted'
        WHEN x.is_af = 0 OR x.completion = 0 OR x.has_formative = 1 THEN 'bg-light text-muted'
        ELSE ''
      END,
    '">',

      '<div class="text-center me-2" style="width: 32px">',
        CASE
          WHEN x.modname = 'turnitintooltwo' THEN
            CONCAT(
              '<img src="', '%%WWWROOT%%', '/mod/turnitintooltwo/pix/icon.png',
              '" alt="Turnitin" class="activityicon" />'
            )
          ELSE
            CONCAT(
              '<img src="', '%%WWWROOT%%', '/mod/', x.modname, '/pix/monologo.svg',
              '" alt="', x.modname, '" class="activityicon" />'
            )
        END,
      '</div>',

      '<div class="flex-grow-1">',
        CONCAT(
          CASE
            WHEN (x.cmvisible = 0 OR x.csvisible = 0) THEN
              CONCAT(
                '<a style="font-weight: 400 !important" href="',
                '%%WWWROOT%%', '/mod/', x.modname, '/view.php', CHAR(63), 'id=', x.cmid,
                '" target="_blank">'
              )
            ELSE
              CONCAT(
                '<a href="',
                '%%WWWROOT%%', '/mod/', x.modname, '/view.php', CHAR(63), 'id=', x.cmid,
                '" target="_blank">'
              )
          END,
          CASE
            WHEN (x.cmvisible = 0 OR x.csvisible = 0) THEN '<i class="fa fa-eye-slash me-2" aria-hidden="true"></i>'
            ELSE ''
          END,
          x.dispname,
          '</a>'
        ),
      '</div>',

      '<div class="text-center" style="width: 140px">',
        CASE
          WHEN x.is_af = 1
            THEN '<span class="badge bg-success text-white" title="In Assessment & Feedback"><i class="fa fa-check" aria-hidden="true"></i></span>'
          ELSE ''
        END,
      '</div>',

      '<div class="text-center" style="width: 200px">',
        CONCAT(
          CASE
            WHEN (x.cmvisible = 0 OR x.csvisible = 0) THEN
              CONCAT(
                '<a style="font-weight: 400 !important" href="',
                '%%WWWROOT%%', '/course/modedit.php', CHAR(63), 'updat', CHAR(101), '=', x.cmid,
                '&return=1#id_activitycompletionheader',
                '" target="_blank" class="text-decoration-none">'
              )
            ELSE
              CONCAT(
                '<a href="',
                '%%WWWROOT%%', '/course/modedit.php', CHAR(63), 'updat', CHAR(101), '=', x.cmid,
                '&return=1#id_activitycompletionheader',
                '" target="_blank" class="text-decoration-none">'
              )
          END,
            CASE
              WHEN x.completion = 2 THEN
                '<span class="badge bg-success text-white"><i class="fa fa-cogs me-1" aria-hidden="true"></i>Automatic</span>'
              WHEN x.completion = 1 THEN
                '<span class="badge bg-success text-white"><i class="fa fa-hand-pointer-o me-1" aria-hidden="true"></i>Manual</span>'
              ELSE
                '<span class="badge bg-secondary text-white">None</span>'
            END,
          '</a>'
        ),
      '</div>',

      '<div class="text-center" style="width: 180px">',
        CONCAT(
          CASE
            WHEN (x.cmvisible = 0 OR x.csvisible = 0) THEN
              CONCAT(
                '<a style="font-weight: 400 !important" href="',
                '%%WWWROOT%%', '/course/modedit.php', CHAR(63), 'updat', CHAR(101), '=', x.cmid,
                '&return=1#id_tagshdr',
                '" target="_blank">'
              )
            ELSE
              CONCAT(
                '<a href="',
                '%%WWWROOT%%', '/course/modedit.php', CHAR(63), 'updat', CHAR(101), '=', x.cmid,
                '&return=1#id_tagshdr',
                '" target="_blank">'
              )
          END,
          CASE
            WHEN x.has_summative = 1 AND x.has_formative = 1 THEN
              '<span class="badge bg-success text-white me-1">summative</span><span class="badge bg-primary text-white">formative</span>'
            WHEN x.has_summative = 1 THEN
              '<span class="badge bg-success text-white">summative</span>'
            WHEN x.has_formative = 1 THEN
              '<span class="badge bg-primary text-white">formative</span>'
            ELSE
              '<span class="badge bg-secondary text-white">no tag</span>'
          END,
          '</a>'
        ),
      '</div>',

    '</div>'
  ) AS "RowHTML"

FROM (
  SELECT
    cm.id AS cmid,
    cm.visible AS cmvisible,
    cs.visible AS csvisible,
    cm.completion AS completion,
    cs.section AS sectionnum,
    m.name AS modname,
    COALESCE(
      NULLIF(TRIM(asg.name), ''),
      NULLIF(TRIM(qz.name), ''),
      NULLIF(TRIM(ttt.name), ''),
      NULLIF(TRIM(chk.name), ''),
      NULLIF(TRIM(modn.name), ''),
      CONCAT('[', m.name, ' #', cm.instance, ']')
    ) AS sortname,
    COALESCE(
      NULLIF(TRIM(asg.name), ''),
      NULLIF(TRIM(qz.name), ''),
      NULLIF(TRIM(ttt.name), ''),
      NULLIF(TRIM(chk.name), ''),
      NULLIF(TRIM(modn.name), ''),
      CONCAT('[', m.name, ' #', cm.instance, ']')
    ) AS dispname,

    CASE
      WHEN LOWER(
        TRIM(
          REPLACE(
            COALESCE(cs.name, ''),
            CONCAT(CHAR(38),'amp',CHAR(59)),
            CHAR(38)
          )
        )
      ) REGEXP CONCAT(
        'assessment',
        '[[:','space:]]*',
        '(&|and)',
        '[[:','space:]]*',
        'feedback'
      )
      THEN 1 ELSE 0
    END AS is_af,

    COALESCE(tags.has_summative, 0) AS has_summative,
    COALESCE(tags.has_formative, 0) AS has_formative,
    alt.altformat AS altformat

  FROM {course_modules} cm
  JOIN {modules} m ON m.id = cm.module
  JOIN {course_sections} cs ON cs.id = cm.section

  LEFT JOIN {assign} asg ON asg.id = cm.instance AND m.name = 'assign'
  LEFT JOIN {quiz} qz ON qz.id = cm.instance AND m.name = 'quiz'
  LEFT JOIN {turnitintooltwo} ttt ON ttt.id = cm.instance AND m.name = 'turnitintooltwo'
  LEFT JOIN {checklist} chk ON chk.id = cm.instance AND m.name = 'checklist'

  LEFT JOIN (
    SELECT cmid.id AS cmid, cmid.idnumber AS name
    FROM {course_modules} cmid
  ) modn ON modn.cmid = cm.id

  LEFT JOIN (
    SELECT
      ti.itemid AS cmid,
      MAX(CASE WHEN LOWER(tg.name) = LOWER('summative') THEN 1 ELSE 0 END) AS has_summative,
      MAX(CASE WHEN LOWER(tg.name) = LOWER('formative') THEN 1 ELSE 0 END) AS has_formative
    FROM {tag_instance} ti
    JOIN {tag} tg ON tg.id = ti.tagid
    WHERE ti.component = 'core'
      AND ti.itemtype = 'course_modules'
    GROUP BY ti.itemid
  ) tags ON tags.cmid = cm.id

  CROSS JOIN (
    SELECT
      CASE
        WHEN EXISTS (
          SELECT 1
          FROM {customfield_field} f
          JOIN {customfield_data} d ON d.fieldid = f.id
          WHERE f.shortname = 'alt_assessment_format'
            AND d.instanceid = %%COURSEID%%
            AND CAST(COALESCE(d.intvalue, d.value) AS UNSIGNED) IN (2, 3, 4, 5, 6, 7)
        )
        THEN 1 ELSE 0
      END AS altformat
  ) alt

  WHERE
    cm.course = %%COURSEID%%
    AND cm.deletioninprogress = 0
    AND (
      m.name IN ('assign','quiz','turnitintooltwo')
      OR COALESCE(tags.has_summative, 0) = 1
      OR COALESCE(tags.has_formative, 0) = 1
    )
) x

UNION ALL

SELECT
  '' AS "Row class",
  -2 AS sortbucket,
  NULL AS sectionnum,
  '' AS modname,
  '' AS sortname,
  CONCAT(
    '<div class="px-3 py-3 border-bottom">',
      '<div class="alert alert-secondary mb-0 w-100">',
        CONCAT(
          '<strong>Your course ',
          'se', CHAR(116), 'tings state that students are not submitting via Moodle.</strong>'
        ),
      '</div>',
    '</div>'
  ) AS "RowHTML"
FROM (SELECT 1) altbanner
WHERE EXISTS (
  SELECT 1
  FROM {customfield_field} f
  JOIN {customfield_data} d ON d.fieldid = f.id
  WHERE f.shortname = 'alt_assessment_format'
    AND d.instanceid = %%COURSEID%%
    AND CAST(COALESCE(d.intvalue, d.value) AS UNSIGNED) IN (2, 3, 4, 5, 6, 7)
)

UNION ALL

SELECT
  '' AS "Row class",
  -1 AS sortbucket,
  NULL AS sectionnum,
  '' AS modname,
  '' AS sortname,
  CONCAT(
    '<div class="px-3 py-3 border-bottom">',
      '<div class="alert alert-warning mb-0 w-100">',
        '<strong>You do not seem to have any assessment activities in the Assessment & Feedback section.</strong> ',
        'Summative assessments should be in this section in order to ensure a consistent experience for students.',
      '</div>',
    '</div>'
  ) AS "RowHTML"
FROM (SELECT 1) afwarn
WHERE
  NOT EXISTS (
    SELECT 1
    FROM {course_modules} cm
    JOIN {modules} m ON m.id = cm.module
    JOIN {course_sections} cs ON cs.id = cm.section
    LEFT JOIN (
      SELECT
        ti.itemid AS cmid,
        MAX(CASE WHEN LOWER(tg.name) = LOWER('summative') THEN 1 ELSE 0 END) AS has_summative
      FROM {tag_instance} ti
      JOIN {tag} tg ON tg.id = ti.tagid
      WHERE ti.component = 'core'
        AND ti.itemtype = 'course_modules'
      GROUP BY ti.itemid
    ) tags ON tags.cmid = cm.id
    WHERE
      cm.course = %%COURSEID%%
      AND cm.deletioninprogress = 0
      AND (
        m.name IN ('assign','quiz','turnitintooltwo')
        OR COALESCE(tags.has_summative, 0) = 1
      )
      AND LOWER(
        TRIM(
          REPLACE(
            COALESCE(cs.name, ''),
            CONCAT(CHAR(38),'amp',CHAR(59)),
            CHAR(38)
          )
        )
      ) REGEXP CONCAT(
        'assessment',
        '[[:','space:]]*',
        '(&|and)',
        '[[:','space:]]*',
        'feedback'
      )
  )
  AND EXISTS (
    SELECT 1
    FROM {course_modules} cm2
    JOIN {modules} m2 ON m2.id = cm2.module
    LEFT JOIN (
      SELECT
        ti.itemid AS cmid,
        MAX(CASE WHEN LOWER(tg.name) = LOWER('summative') THEN 1 ELSE 0 END) AS has_summative
      FROM {tag_instance} ti
      JOIN {tag} tg ON tg.id = ti.tagid
      WHERE ti.component = 'core'
        AND ti.itemtype = 'course_modules'
      GROUP BY ti.itemid
    ) tags2 ON tags2.cmid = cm2.id
    WHERE
      cm2.course = %%COURSEID%%
      AND cm2.deletioninprogress = 0
      AND (
        m2.name IN ('assign','quiz','turnitintooltwo')
        OR COALESCE(tags2.has_summative, 0) = 1
      )
  )

UNION ALL

SELECT
  '' AS "Row class",
  -1 AS sortbucket,
  NULL AS sectionnum,
  '' AS modname,
  '' AS sortname,
  CONCAT(
    '<div class="px-3 py-3 border-bottom">',
      '<div class="alert alert-warning mb-0 w-100">',
        '<strong>You have submission links on your course page, but none have completion criteria attached. </strong>',
        'Please add completion criteria to your summative assessment by clicking the link below.',
      '</div>',
    '</div>'
  ) AS "RowHTML"
FROM (SELECT 1) nocomp
WHERE EXISTS (
  SELECT 1
  FROM {course_modules} cmx
  JOIN {modules} mx ON mx.id = cmx.module
  JOIN {course_sections} csx ON csx.id = cmx.section
  LEFT JOIN (
    SELECT
      ti.itemid AS cmid,
      MAX(CASE WHEN LOWER(tg.name) = LOWER('summative') THEN 1 ELSE 0 END) AS has_summative,
      MAX(CASE WHEN LOWER(tg.name) = LOWER('formative') THEN 1 ELSE 0 END) AS has_formative
    FROM {tag_instance} ti
    JOIN {tag} tg ON tg.id = ti.tagid
    WHERE ti.component = 'core'
      AND ti.itemtype = 'course_modules'
    GROUP BY ti.itemid
  ) tagsx ON tagsx.cmid = cmx.id
  WHERE
    cmx.course = %%COURSEID%%
    AND cmx.deletioninprogress = 0
    AND (
      mx.name IN ('assign','quiz','turnitintooltwo')
      OR COALESCE(tagsx.has_summative, 0) = 1
      OR COALESCE(tagsx.has_formative, 0) = 1
    )
)
AND NOT EXISTS (
  SELECT 1
  FROM {course_modules} cmx
  JOIN {modules} mx ON mx.id = cmx.module
  JOIN {course_sections} csx ON csx.id = cmx.section
  LEFT JOIN (
    SELECT
      ti.itemid AS cmid,
      MAX(CASE WHEN LOWER(tg.name) = LOWER('summative') THEN 1 ELSE 0 END) AS has_summative,
      MAX(CASE WHEN LOWER(tg.name) = LOWER('formative') THEN 1 ELSE 0 END) AS has_formative
    FROM {tag_instance} ti
    JOIN {tag} tg ON tg.id = ti.tagid
    WHERE ti.component = 'core'
      AND ti.itemtype = 'course_modules'
    GROUP BY ti.itemid
  ) tagsx ON tagsx.cmid = cmx.id
  WHERE
    cmx.course = %%COURSEID%%
    AND cmx.deletioninprogress = 0
    AND (
      mx.name IN ('assign','quiz','turnitintooltwo')
      OR COALESCE(tagsx.has_summative, 0) = 1
      OR COALESCE(tagsx.has_formative, 0) = 1
    )
    AND cmx.completion <> 0
)

UNION ALL

SELECT
  '' AS "Row class",
  -1 AS sortbucket,
  NULL AS sectionnum,
  '' AS modname,
  '' AS sortname,
  CONCAT(
    '<div class="px-3 py-3 border-bottom">',
      '<div class="alert alert-warning mb-0 w-100">',
        'This course has no Assignments, Quizzes, Turnitin activities, or tagged assessment activities. ',
        'If students are not submitting via Moodle, please adjust the course ',
        'se', CHAR(116), 'tings to show this. Scroll down to the Minimum Standards section and choose the relevant option from the menu.',
        ' Otherwise, you do need to include assessment submission links on your course page.',
      '</div>',
    '</div>'
  ) AS "RowHTML"
FROM (SELECT 1) nomatch
WHERE NOT EXISTS (
  SELECT 1
  FROM {course_modules} cmx
  JOIN {modules} mx ON mx.id = cmx.module
  JOIN {course_sections} csx ON csx.id = cmx.section
  LEFT JOIN (
    SELECT
      ti.itemid AS cmid,
      MAX(CASE WHEN LOWER(tg.name) = LOWER('summative') THEN 1 ELSE 0 END) AS has_summative,
      MAX(CASE WHEN LOWER(tg.name) = LOWER('formative') THEN 1 ELSE 0 END) AS has_formative
    FROM {tag_instance} ti
    JOIN {tag} tg ON tg.id = ti.tagid
    WHERE ti.component = 'core'
      AND ti.itemtype = 'course_modules'
    GROUP BY ti.itemid
  ) tagsx ON tagsx.cmid = cmx.id
  WHERE
    cmx.course = %%COURSEID%%
    AND cmx.deletioninprogress = 0
    AND (
      mx.name IN ('assign','quiz','turnitintooltwo')
      OR COALESCE(tagsx.has_summative, 0) = 1
      OR COALESCE(tagsx.has_formative, 0) = 1
    )
)

ORDER BY
  sortbucket,
  sectionnum,
  modname,
  sortname
```

## Template Header

```
<div class="card shadow-sm mb-3">
  <div class="card-header bg-light">
    <h3 class="h6 mb-1" style="font-size: 14px;" data-asw-orgfontsize="14">
      Assessment activities with completion tracking</h3>
    <p class="text-muted small mb-0" data-asw-orgfontsize="14"
      style="font-size: 14px;">This report lists assignment, quiz, Turnitin, and
      summative-tagged activities in this course.  At least ONE of these needs
      to have completion criteria attached.  <a
        href="https://uelac.sharepoint.com/sites/centreforexcellenceinlearningandteaching591/SitePages/09-Summative-Links-with-Completion-Criteria.aspx"
        target="_blank" rel="noopener">Click here to view the guide for this
        report.</a></p>
  </div>
  <div class="card-body p-0">
    <div
      class="d-flex fw-bold border-bottom px-3 py-2 bg-light align-items-center">
      <div class="text-center" style="width: 32px;"> </div>
      <div class="flex-grow-1">Activity</div>
      <div class="text-center" style="width: 140px;">Assessment &amp; Feedback
        Section</div>
      <div class="text-center" style="width: 200px;">Completion criteria</div>
      <div class="text-center" style="width: 180px;">Assessment tag</div>
    </div>
  </div>
</div>
```

## Template Record

```
<p>[[RowHTML]]</p>
```
