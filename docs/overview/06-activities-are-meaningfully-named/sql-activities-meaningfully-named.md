# SQL: Activities Meaningfully Named


[Download report XML](/moodle-baselines/assets/gitbook/06-min-standards-meaningful-names.xml){download}


```
SELECT outq.rowhtml
FROM (
    SELECT
        CASE
            WHEN flagged.cmid IS NULL THEN CONCAT(
                '<div class="alert alert-success mb-0 w-100">',
                '<i class="fa fa-check-circle me-1" aria-hidden="true"></i> ',
                '<b>Great news!</b> No files or activities with problematic names were found.',
                '</div>'
            )
            ELSE CONCAT(
                '<div class="d-flex border-bottom px-3 py-2 align-items-start" style="background-color:#fff3cd">',
                '<div class="me-3 pt-1" style="width: 2rem">',
                '<img src="',
                '%%WWWROOT%%/theme/image.php/remui/mod_',
                flagged.modname,
                '/0/icon" class="icon" width="20" height="20" alt="',
                flagged.modname,
                '">',
                '</div>',
                '<div class="flex-grow-1">',
                '<div>',
                '<a href="',
                '%%WWWROOT%%/mod/',
                flagged.modname,
                '/view.php',
                CHAR(63),
                'id=',
                flagged.cmid,
                '" target="_blank" class="text-decoration-none">',
                flagged.activityname,
                '</a> ',
                '<a href="',
                '%%WWWROOT%%/course/modedit.php',
                CHAR(63),
                CHAR(117,112,100,97,116,101),
                '=',
                flagged.cmid,
                '" target="_blank" class="text-muted ms-1" title="Edit activity name">',
                '<i class="fa fa-pencil"></i>',
                '</a>',
                '</div>',
                '<div class="small text-muted mt-1">',
                flagged.reasontext,
                '</div>',
                '</div>',
                '</div>'
            )
        END AS rowhtml,
        CASE WHEN flagged.cmid IS NULL THEN 0 ELSE 1 END AS sortkey,
        COALESCE(flagged.activityname_lower, '') AS sortname
    FROM {course} c
    LEFT JOIN (
        SELECT
            b2.cmid,
            b2.modname,
            b2.activityname,
            b2.activityname_trim,
            b2.activityname_lower,
            CASE
                WHEN b2.activity_problem = 1 THEN
                    CASE
                        WHEN b2.activity_symbol_problem = 1 THEN 'Activity or resource name contains excessive special characters and may not be meaningful to students'
                        WHEN b2.activityname_lower IN (
                            '',
                            'document',
                            'presentation',
                            'untitled',
                            'new document',
                            'new file',
                            'file',
                            'resource',
                            'upload',
                            'draft',
                            'final',
                            'notes',
                            'slides',
                            'qualdata'
                        ) THEN 'Activity or resource has a very generic name'
                        WHEN b2.activityname_trim REGEXP '^[A-Z]{2,4}[ _-][A-Z]{2,4}[0-9]{3}$' THEN 'Activity or resource name looks like a code and may not be meaningful to students'
                        WHEN b2.activityname_lower REGEXP '^[a-z0-9]{10,}$'
                             AND b2.activityname_lower REGEXP '[0-9]' THEN 'Activity or resource name looks like an auto-generated code or hash'
                        WHEN CHAR_LENGTH(b2.activityname_trim) < 3 THEN 'Activity or resource name is extremely short'
                        ELSE 'Activity or resource name looks auto-generated or not meaningful'
                    END
                WHEN b2.filename_generic_relevant = 1 THEN 'Attached file has a very generic filename'
                WHEN b2.filename_hash_problem = 1 THEN 'Attached file name looks like an auto-generated code or hash'
                WHEN b2.filename_code_problem = 1 THEN 'Attached file name looks like a module code and may not be meaningful to students'
                ELSE 'Flagged by naming heuristic'
            END AS reasontext
        FROM (
            SELECT
                b1.*,
                CASE
                    WHEN b1.filename_is_generic = 1
                         AND (b1.modname = 'folder' OR b1.activity_problem = 1)
                    THEN 1
                    ELSE 0
                END AS filename_generic_relevant
            FROM (
                SELECT
                    norm.*,
                    CASE
                        WHEN norm.nameknown = 1
                             AND norm.activityname_trim REGEXP CONCAT('[^A-Za-z0-9 _.,:&()!/', CONVERT(0x3F USING utf8mb4), '-]')
                             AND norm.activityname_trim REGEXP '[0-9A-Za-z]'
                             AND norm.activityname_trim REGEXP CONCAT(
                                 '[^A-Za-z0-9 _.,:&()!/', CONVERT(0x3F USING utf8mb4), '-].*',
                                 '[^A-Za-z0-9 _.,:&()!/', CONVERT(0x3F USING utf8mb4), '-].*',
                                 '[^A-Za-z0-9 _.,:&()!/', CONVERT(0x3F USING utf8mb4), '-]'
                             )
                        THEN 1
                        ELSE 0
                    END AS activity_symbol_problem,
                    CASE
                        WHEN norm.nameknown = 1
                             AND (
                                 norm.activityname_lower IN (
                                     '',
                                     'document',
                                     'presentation',
                                     'untitled',
                                     'new document',
                                     'new file',
                                     'file',
                                     'resource',
                                     'upload',
                                     'draft',
                                     'final',
                                     'notes',
                                     'slides',
                                     'qualdata'
                                 )
                                 OR norm.activityname_lower REGEXP CONCAT(
                                     '(^|[[:','space:]])[a-z0-9]{6,}[0-9][a-z0-9]{5,}([[:','space:]]|$)'
                                 )
                                 OR norm.activityname_lower REGEXP CONCAT(
                                     '(^|[[:','space:]])[0-9]{3,}[a-z][a-z0-9]{8,}([[:','space:]]|$)'
                                 )
                                 OR norm.activityname_lower REGEXP '([0-9]{4,}.*){2,}'
                                 OR norm.activityname_lower REGEXP CONCAT(
                                     '(^|[[:','space:]])[bcdfghjklmnpqrstvwxyz0-9]{8,}([[:','space:]]|$)'
                                 )
                                 OR norm.activityname_lower REGEXP '^[a-z0-9]*[0-9][a-z0-9]*([._/-][a-z0-9]{2,}){2,}[._/-]{0,1}$'
                                 OR norm.activityname_trim REGEXP '^[A-Z]{2,4}[ _-][A-Z]{2,4}[0-9]{3}$'
                                 OR (
                                     norm.activityname_lower REGEXP '^[a-z0-9]{10,}$'
                                     AND norm.activityname_lower REGEXP '[0-9]'
                                 )
                                 OR CHAR_LENGTH(norm.activityname_trim) < 3
                                 OR (
                                     norm.activityname_trim REGEXP CONCAT('[^A-Za-z0-9 _.,:&()!/', CONVERT(0x3F USING utf8mb4), '-]')
                                     AND norm.activityname_trim REGEXP '[0-9A-Za-z]'
                                     AND norm.activityname_trim REGEXP CONCAT(
                                         '[^A-Za-z0-9 _.,:&()!/', CONVERT(0x3F USING utf8mb4), '-].*',
                                         '[^A-Za-z0-9 _.,:&()!/', CONVERT(0x3F USING utf8mb4), '-].*',
                                         '[^A-Za-z0-9 _.,:&()!/', CONVERT(0x3F USING utf8mb4), '-]'
                                     )
                                 )
                             )
                        THEN 1
                        ELSE 0
                    END AS activity_problem,
                    CASE
                        WHEN LOWER(norm.filename) REGEXP '^(document|presentation|untitled|file|resource|upload|draft|final|notes|slides|qualdata|scan|image)([ _-]{0,1}v{0,1}[0-9]{1,3}){0,1}([.](pdf|doc|docx|ppt|pptx)){0,1}$'
                        THEN 1
                        ELSE 0
                    END AS filename_is_generic,
                    CASE
                        WHEN LOWER(norm.filename) REGEXP '^[a-z0-9]{12,}[.](pdf|doc|docx|ppt|pptx)$'
                             AND LOWER(norm.filename) REGEXP '[0-9]'
                        THEN 1
                        ELSE 0
                    END AS filename_hash_problem,
                    CASE
                        WHEN TRIM(norm.filename) REGEXP '^[A-Z]{2,4}[ _-][A-Z]{2,4}[0-9]{3}[.](pdf|doc|docx|ppt|pptx)$'
                        THEN 1
                        ELSE 0
                    END AS filename_code_problem
                FROM (
                    SELECT
                        raw.*,
                        TRIM(raw.activityname) AS activityname_trim,
                        LOWER(TRIM(raw.activityname)) AS activityname_lower
                    FROM (
                        SELECT
                            cm.id AS cmid,
                            m.name AS modname,
                            cm.visible AS cmvisible,
                            cs.visible AS sectionvisible,
                            REPLACE(
                                CONVERT(
                                    COALESCE(
                                        asg.name,
                                        bk.name,
                                        ch.name,
                                        dt.name,
                                        fb.name,
                                        fd.name,
                                        fm.name,
                                        gl.name,
                                        h5.name,
                                        ls.name,
                                        lti.name,
                                        pg.name,
                                        qz.name,
                                        rs.name,
                                        sc.name,
                                        ur.name,
                                        wk.name,
                                        ws.name,
                                        lb.name,
                                        CONCAT('[', m.name, ' #', cm.instance, ']')
                                    )
                                    USING utf8mb4
                                ),
                                CONVERT(0xC2A0 USING utf8mb4),
                                ' '
                            ) AS activityname,
                            CASE
                                WHEN COALESCE(
                                    asg.name,
                                    bk.name,
                                    ch.name,
                                    dt.name,
                                    fb.name,
                                    fd.name,
                                    fm.name,
                                    gl.name,
                                    h5.name,
                                    ls.name,
                                    lti.name,
                                    pg.name,
                                    qz.name,
                                    rs.name,
                                    sc.name,
                                    ur.name,
                                    wk.name,
                                    ws.name,
                                    lb.name
                                ) IS NULL
                                THEN 0
                                ELSE 1
                            END AS nameknown,
                            CONVERT(COALESCE(f.filename, '') USING utf8mb4) AS filename,
                            CONVERT(
                                COALESCE(
                                    asg.intro,
                                    bk.intro,
                                    ch.intro,
                                    dt.intro,
                                    fb.intro,
                                    fd.intro,
                                    fm.intro,
                                    gl.intro,
                                    h5.intro,
                                    ls.intro,
                                    lti.intro,
                                    pg.intro,
                                    qz.intro,
                                    rs.intro,
                                    sc.intro,
                                    ur.intro,
                                    wk.intro,
                                    ws.intro,
                                    lb.intro,
                                    ''
                                )
                                USING utf8mb4
                            ) AS introtext
                        FROM {course_modules} cm
                        JOIN {course_sections} cs ON cs.id = cm.section
                        JOIN {modules} m ON m.id = cm.module
                        LEFT JOIN {assign} asg ON asg.id = cm.instance AND m.name = 'assign'
                        LEFT JOIN {book} bk ON bk.id = cm.instance AND m.name = 'book'
                        LEFT JOIN {choice} ch ON ch.id = cm.instance AND m.name = 'choice'
                        LEFT JOIN {data} dt ON dt.id = cm.instance AND m.name = 'data'
                        LEFT JOIN {feedback} fb ON fb.id = cm.instance AND m.name = 'feedback'
                        LEFT JOIN {folder} fd ON fd.id = cm.instance AND m.name = 'folder'
                        LEFT JOIN {forum} fm ON fm.id = cm.instance AND m.name = 'forum'
                        LEFT JOIN {glossary} gl ON gl.id = cm.instance AND m.name = 'glossary'
                        LEFT JOIN {h5pactivity} h5 ON h5.id = cm.instance AND m.name = 'h5pactivity'
                        LEFT JOIN {lesson} ls ON ls.id = cm.instance AND m.name = 'lesson'
                        LEFT JOIN {lti} lti ON lti.id = cm.instance AND m.name = 'lti'
                        LEFT JOIN {page} pg ON pg.id = cm.instance AND m.name = 'page'
                        LEFT JOIN {quiz} qz ON qz.id = cm.instance AND m.name = 'quiz'
                        LEFT JOIN {resource} rs ON rs.id = cm.instance AND m.name = 'resource'
                        LEFT JOIN {scorm} sc ON sc.id = cm.instance AND m.name = 'scorm'
                        LEFT JOIN {url} ur ON ur.id = cm.instance AND m.name = 'url'
                        LEFT JOIN {wiki} wk ON wk.id = cm.instance AND m.name = 'wiki'
                        LEFT JOIN {workshop} ws ON ws.id = cm.instance AND m.name = 'workshop'
                        LEFT JOIN {label} lb ON lb.id = cm.instance AND m.name = 'label'
                        LEFT JOIN {context} ctx
                          ON ctx.contextlevel = 70
                         AND ctx.instanceid = cm.id
                        LEFT JOIN {files} f
                          ON f.contextid = ctx.id
                         AND f.filename <> '.'
                         AND f.filesize > 0
                         AND f.filearea IN ('content','chapter','intro')
                         AND f.component IN ('mod_resource','mod_page','mod_book','mod_folder','mod_label','mod_url')
                        WHERE cm.course = %%COURSEID%%
                          AND cm.deletioninprogress = 0
                    ) raw
                ) norm
            ) b1
        ) b2
        WHERE b2.cmvisible = 1
          AND b2.sectionvisible = 1
          AND b2.modname <> 'label'
          AND b2.activityname_lower <> 'announcements'
          AND TRIM(REGEXP_REPLACE(COALESCE(b2.introtext, ''), '<[^>]*>', '')) = ''
          AND (
              b2.activity_problem = 1
              OR b2.filename_generic_relevant = 1
              OR b2.filename_hash_problem = 1
              OR b2.filename_code_problem = 1
          )
          AND NOT (
              b2.activityname_trim REGEXP CONCAT(
                  '^[^0-9A-Z]*[A-Z]{2,4}[0-9]{3,5}([ _-][0-9]{1,3}){0,1}[[:','space:]].{8,}$'
              )
              OR b2.activityname_trim REGEXP CONCAT(
                  '^(19[0-9]{2}|20[0-9]{2})[ _-][0-9]{2}[[:','space:]].{5,}[[:','space:]][A-Z]{2,4}[0-9]{3,5}([ _-]{1,3}[A-Z]{2,4}[0-9]{3,5}){0,3}[[:','space:]]*$'
              )
              OR b2.activityname_trim REGEXP CONCAT(
                  '^[A-Z]{2,4}[0-9]{3,5}([ _-][0-9]{1,3}){0,1}[[:','space:]].{5,}[[:','space:]][(](19[0-9]{2}|20[0-9]{2})[)][ _-][0-9]{2}[[:','space:]]*$'
              )
          )
    ) flagged ON 1 = 1
    WHERE c.id = %%COURSEID%%
) outq
ORDER BY outq.sortkey, outq.sortname
```

## Template Header

```
<div class="card shadow-sm mb-3">
  <div
    class="card-header bg-light d-flex justify-content-between align-items-start gap-2 flex-wrap">
    <div>
      <h3 class="h6 mb-1">Activities &amp; Resources Needing Better Names</h3>
      <p class="text-muted small mb-0">This report lists activities and
        resources whose names or attached file names look generic,
        auto-generated, or code-like. Click the activity name to review and
        improve it so it is clearer for students. <a
          href="https://uelac.sharepoint.com/sites/centreforexcellenceinlearningandteaching591/SitePages/06-Activities-are-meaningfully-named.aspx"
          target="_blank" rel="noopener">Click here to view the guide for this
          report</a>.</p>
    </div>
  </div>
  <div class="card-body p-0">
    <div
      class="d-flex fw-bold border-bottom px-3 py-2 bg-light align-items-center">
      <div class="flex-grow-1">Activity or resource</div>
      <div class="text-center" style="width: 260px;"> </div>
    </div>
  </div>
</div>
```

## Template Record

```
<p>[[Rowhtml]]</p>
```
