# SQL: Summary Report


[Download report XML](/moodle-baselines/assets/gitbook/moodle-minimum-standards-overview-report.xml){download}


```
SELECT CONCAT(
    '<a href="',
    '%%WWWROOT%%/blo', 'cks/configurable_reports/viewreport.php',
    CHAR(63),
    'id=102&courseid=',
    %%COURSEID%%,
    '" target="_blank">01 Module Guide Available</a>'
) AS audititem,
CASE
    WHEN EXISTS (
        SELECT 1
        FROM {course_modules} cm
        JOIN {modules} m ON m.id = cm.module
        LEFT JOIN {page} pg ON pg.id = cm.instance AND m.name = 'page'
        LEFT JOIN {resource} rs ON rs.id = cm.instance AND m.name = 'resource'
        LEFT JOIN {book} bk ON bk.id = cm.instance AND m.name = 'book'
        LEFT JOIN {url} u ON u.id = cm.instance AND m.name = 'url'
        LEFT JOIN {folder} fd ON fd.id = cm.instance AND m.name = 'folder'
        WHERE cm.course = c.id
          AND cm.visible = 1
          AND cm.deletioninprogress = 0
          AND (
              LOWER(COALESCE(pg.name, rs.name, bk.name, u.name, fd.name, '')) LIKE '%module guide%'
              OR LOWER(COALESCE(pg.name, rs.name, bk.name, u.name, fd.name, '')) LIKE '%course guide%'
              OR LOWER(COALESCE(pg.name, rs.name, bk.name, u.name, fd.name, '')) LIKE '%module handbook%'
          )
    )
    THEN CONCAT(
        '<a class="badge bg-success text-decoration-none pass-badge" ',
        'href="%%WWWROOT%%/blo', 'cks/configurable_reports/viewreport.php',
        CHAR(63),
        'id=102&courseid=',
        %%COURSEID%%,
        '" target="_blank">Pass</a>'
    )
    ELSE CONCAT(
        '<a class="badge bg-danger text-decoration-none fail-badge" ',
        'href="%%WWWROOT%%/blo', 'cks/configurable_reports/viewreport.php',
        CHAR(63),
        'id=102&courseid=',
        %%COURSEID%%,
        '" target="_blank">Fail</a>'
    )
END AS auditresult
FROM {course} c
WHERE c.id = %%COURSEID%%

UNION ALL

SELECT CONCAT(
    '<a href="',
    '%%WWWROOT%%/blo', 'cks/configurable_reports/viewreport.php',
    CHAR(63),
    'id=105&courseid=',
    %%COURSEID%%,
    '" target="_blank">02 Is the contact information for the module tutor visible in the blo', 'cks drawer</a>'
) AS audititem,
CASE
    WHEN EXISTS (
        SELECT 1
        FROM {context} ctx
        JOIN {role_assignments} ra ON ra.contextid = ctx.id
        JOIN {role} r ON r.id = ra.roleid
        JOIN {user} u ON u.id = ra.userid
        WHERE ctx.contextlevel = 50
          AND ctx.instanceid = c.id
          AND r.shortname = 'editingteacher'
          AND u.suspended = 0
    )
    THEN CONCAT(
        '<a class="badge bg-success text-decoration-none pass-badge" ',
        'href="%%WWWROOT%%/blo', 'cks/configurable_reports/viewreport.php',
        CHAR(63),
        'id=105&courseid=',
        %%COURSEID%%,
        '" target="_blank">Pass</a>'
    )
    ELSE CONCAT(
        '<a class="badge bg-danger text-decoration-none fail-badge" ',
        'href="%%WWWROOT%%/blo', 'cks/configurable_reports/viewreport.php',
        CHAR(63),
        'id=105&courseid=',
        %%COURSEID%%,
        '" target="_blank">Fail</a>'
    )
END AS auditresult
FROM {course} c
WHERE c.id = %%COURSEID%%

UNION ALL

SELECT CONCAT(
    '<a href="',
    '%%WWWROOT%%/blo', 'cks/configurable_reports/viewreport.php',
    CHAR(63),
    'id=107&courseid=',
    %%COURSEID%%,
    '" target="_blank">03 Does the module tutor have a profile picture so students know who they are</a>'
) AS audititem,
CASE
    WHEN EXISTS (
        SELECT 1
        FROM {context} ctx
        JOIN {role_assignments} ra ON ra.contextid = ctx.id
        JOIN {role} r ON r.id = ra.roleid
        JOIN {user} u ON u.id = ra.userid
        WHERE ctx.contextlevel = 50
          AND ctx.instanceid = c.id
          AND r.shortname = 'editingteacher'
          AND u.suspended = 0
          AND u.picture > 0
    )
    THEN CONCAT(
        '<a class="badge bg-success text-decoration-none pass-badge" ',
        'href="%%WWWROOT%%/blo', 'cks/configurable_reports/viewreport.php',
        CHAR(63),
        'id=107&courseid=',
        %%COURSEID%%,
        '" target="_blank">Pass</a>'
    )
    ELSE CONCAT(
        '<a class="badge bg-danger text-decoration-none fail-badge" ',
        'href="%%WWWROOT%%/blo', 'cks/configurable_reports/viewreport.php',
        CHAR(63),
        'id=107&courseid=',
        %%COURSEID%%,
        '" target="_blank">Fail</a>'
    )
END AS auditresult
FROM {course} c
WHERE c.id = %%COURSEID%%

UNION ALL

SELECT CONCAT(
    '<a href="',
    '%%WWWROOT%%/blo', 'cks/configurable_reports/viewreport.php',
    CHAR(63),
    'id=103&courseid=',
    %%COURSEID%%,
    '" target="_blank">04 Have you made sure to hide or remove empty sections</a>'
) AS audititem,
CASE
    WHEN EXISTS (
        SELECT 1
        FROM {course_sections} cs
        WHERE cs.course = c.id
          AND cs.visible = 1
          AND cs.section > 0
          AND NOT EXISTS (
              SELECT 1
              FROM {course_modules} cm
              WHERE cm.course = c.id
                AND cm.section = cs.id
                AND cm.deletioninprogress = 0
          )
    )
    THEN CONCAT(
        '<a class="badge bg-danger text-decoration-none fail-badge" ',
        'href="%%WWWROOT%%/blo', 'cks/configurable_reports/viewreport.php',
        CHAR(63),
        'id=103&courseid=',
        %%COURSEID%%,
        '" target="_blank">Fail</a>'
    )
    ELSE CONCAT(
        '<a class="badge bg-success text-decoration-none pass-badge" ',
        'href="%%WWWROOT%%/blo', 'cks/configurable_reports/viewreport.php',
        CHAR(63),
        'id=103&courseid=',
        %%COURSEID%%,
        '" target="_blank">Pass</a>'
    )
END AS auditresult
FROM {course} c
WHERE c.id = %%COURSEID%%

UNION ALL

SELECT CONCAT(
    '<a href="',
    '%%WWWROOT%%/blo', 'cks/configurable_reports/viewreport.php',
    CHAR(63),
    'id=104&courseid=',
    %%COURSEID%%,
    '" target="_blank">05 Have you given your visible sections a meaningful name</a>'
) AS audititem,
CASE
    WHEN EXISTS (
        SELECT 1
        FROM {course_sections} cs
        WHERE cs.course = c.id
          AND cs.visible = 1
          AND cs.section > 0
          AND (
              cs.name IS NULL
              OR TRIM(cs.name) = ''
              OR LOWER(cs.name) LIKE '%edit title%'
              OR LOWER(cs.name) LIKE 'section%'
              OR LOWER(cs.name) LIKE 'topic%'
          )
    )
    THEN CONCAT(
        '<a class="badge bg-danger text-decoration-none fail-badge" ',
        'href="%%WWWROOT%%/blo', 'cks/configurable_reports/viewreport.php',
        CHAR(63),
        'id=104&courseid=',
        %%COURSEID%%,
        '" target="_blank">Fail</a>'
    )
    ELSE CONCAT(
        '<a class="badge bg-success text-decoration-none pass-badge" ',
        'href="%%WWWROOT%%/blo', 'cks/configurable_reports/viewreport.php',
        CHAR(63),
        'id=104&courseid=',
        %%COURSEID%%,
        '" target="_blank">Pass</a>'
    )
END AS auditresult
FROM {course} c
WHERE c.id = %%COURSEID%%

UNION ALL

SELECT CONCAT(
    '<a href="',
    '%%WWWROOT%%/blo', 'cks/configurable_reports/viewreport.php',
    CHAR(63),
    'id=109&courseid=',
    %%COURSEID%%,
    '" target="_blank">06 Are your activities and resources named in a way that makes sense to students</a>'
) AS audititem,
CASE
    WHEN EXISTS (
        SELECT 1
        FROM (
            SELECT
                raw.cmid,
                raw.modname,
                raw.cmvisible,
                raw.sectionvisible,
                raw.activityname,
                TRIM(raw.activityname) AS activityname_trim,
                LOWER(TRIM(raw.activityname)) AS activityname_lower,
                raw.filename
            FROM (
                SELECT
                    cm.id AS cmid,
                    m.name AS modname,
                    cm.visible AS cmvisible,
                    cs.visible AS sectionvisible,
                    REPLACE(
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
                            pg.name,
                            qz.name,
                            rs.name,
                            sc.name,
                            ur.name,
                            wk.name,
                            ws.name,
                            lb.name,
                            CONCAT('[', m.name, ' ', CHAR(35), cm.instance, ']')
                        ),
                        CAST(CHAR(194, 160) AS CHAR),
                        ' '
                    ) AS activityname,
                    f.filename AS filename
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
                 AND f.filearea IN ('content', 'chapter', 'intro')
                 AND f.component IN ('mod_resource', 'mod_page', 'mod_book', 'mod_folder', 'mod_label', 'mod_url')
                WHERE cm.course = %%COURSEID%%
                  AND cm.deletioninprogress = 0
            ) raw
        ) base
        WHERE base.cmvisible = 1
          AND base.sectionvisible = 1
          AND base.modname <> 'lti'
          AND base.modname <> 'label'
          AND base.activityname_lower <> 'announcements'
          AND (
              base.activityname_lower IN (
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
              OR base.activityname_lower REGEXP CONCAT('(^|[[:','space:]])[a-z0-9]{6,}[0-9][a-z0-9]{5,}([[:','space:]]|$)')
              OR base.activityname_lower REGEXP CONCAT('(^|[[:','space:]])[0-9]{3,}[a-z][a-z0-9]{8,}([[:','space:]]|$)')
              OR base.activityname_lower REGEXP '([0-9]{4,}.*){2,}'
              OR base.activityname_lower REGEXP CONCAT('(^|[[:','space:]])[bcdfghjklmnpqrstvwxyz0-9]{8,}([[:','space:]]|$)')
              OR base.activityname_trim REGEXP '^[A-Z]{2,4}[ _-][A-Z]{2,4}[0-9]{3}$'
              OR (
                  base.activityname_lower REGEXP '^[a-z0-9]{10,}$'
                  AND base.activityname_lower REGEXP '[0-9]'
              )
              OR CHAR_LENGTH(base.activityname_trim) < 3
              OR LOWER(base.filename) REGEXP '^(document|presentation|untitled|file|resource|upload|draft|final|notes|slides|qualdata|scan|image)([ _-]{0,1}v{0,1}[0-9]{0,3}){0,1}[.](pdf|doc|docx|ppt|pptx)$'
              OR (
                  LOWER(base.filename) REGEXP '^[a-z0-9]{12,}[.](pdf|doc|docx|ppt|pptx)$'
                  AND LOWER(base.filename) REGEXP '[0-9]'
              )
              OR TRIM(base.filename) REGEXP '^[A-Z]{2,4}[ _-][A-Z]{2,4}[0-9]{3}[.](pdf|doc|docx|ppt|pptx)$'
          )
          AND NOT (
              base.activityname_trim REGEXP CONCAT('^[^0-9A-Z]*[A-Z]{2,4}[0-9]{3,5}([ _-][0-9]{1,3}){0,1}[[:','space:]].{8,}$')
              OR base.activityname_trim REGEXP CONCAT('^(19[0-9]{2}|20[0-9]{2})[ _-][0-9]{2}[[:','space:]].{5,}[[:','space:]][A-Z]{2,4}[0-9]{3,5}([ _-]{1,3}[A-Z]{2,4}[0-9]{3,5}){0,3}[[:','space:]]*$')
              OR base.activityname_trim REGEXP CONCAT('^[A-Z]{2,4}[0-9]{3,5}([ _-][0-9]{1,3}){0,1}[[:','space:]].{5,}[[:','space:]][(](19[0-9]{2}|20[0-9]{2})[)][ _-][0-9]{2}[[:','space:]]*$')
          )
    )
    THEN CONCAT(
        '<a class="badge bg-danger text-decoration-none fail-badge" ',
        'href="%%WWWROOT%%/blo', 'cks/configurable_reports/viewreport.php',
        CHAR(63),
        'id=109&courseid=',
        %%COURSEID%%,
        '" target="_blank">Fail</a>'
    )
    ELSE CONCAT(
        '<a class="badge bg-success text-decoration-none pass-badge" ',
        'href="%%WWWROOT%%/blo', 'cks/configurable_reports/viewreport.php',
        CHAR(63),
        'id=109&courseid=',
        %%COURSEID%%,
        '" target="_blank">Pass</a>'
    )
END AS auditresult
FROM {course} c
WHERE c.id = %%COURSEID%%
UNION ALL

SELECT CONCAT(
    '<a href="',
    '%%WWWROOT%%/blo', 'cks/configurable_reports/viewreport.php',
    CHAR(63),
    'id=106&courseid=',
    %%COURSEID%%,
    '" target="_blank">07 Have you added module specific careers information in the relevant section</a>'
) AS audititem,
CASE
    WHEN EXISTS (
        SELECT 1
        FROM {course_sections} cs
        JOIN {course_modules} cm
          ON cm.section = cs.id
         AND cm.deletioninprogress = 0
        JOIN {modules} m ON m.id = cm.module
        LEFT JOIN {label} lb ON lb.id = cm.instance AND m.name = 'label'
        WHERE cs.course = c.id
          AND cs.visible = 1
AND LOWER(TRIM(cs.name)) IN ('career & employability', 'careers & employability')
          AND cm.visible = 1
          AND (
              cm.availability IS NULL
              OR cm.availability NOT LIKE '%hidden%'
          )
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
    THEN CONCAT(
        '<a class="badge bg-success text-decoration-none pass-badge" ',
        'href="%%WWWROOT%%/blo', 'cks/configurable_reports/viewreport.php',
        CHAR(63),
        'id=106&courseid=',
        %%COURSEID%%,
        '" target="_blank">Pass</a>'
    )
    ELSE CONCAT(
        '<a class="badge bg-danger text-decoration-none fail-badge" ',
        'href="%%WWWROOT%%/blo', 'cks/configurable_reports/viewreport.php',
        CHAR(63),
        'id=106&courseid=',
        %%COURSEID%%,
        '" target="_blank">Fail</a>'
    )
END AS auditresult
FROM {course} c
WHERE c.id = %%COURSEID%%

UNION ALL

SELECT CONCAT(
    '<a href="',
    '%%WWWROOT%%/blo', 'cks/configurable_reports/viewreport.php',
    CHAR(63),
    'id=108&courseid=',
    %%COURSEID%%,
    '" target="_blank">08 Have you ensured there are no copyright files</a>'
) AS audititem,
CASE
    WHEN NOT EXISTS (
        SELECT 1
        FROM {course_modules} cm2
        JOIN {context} ctx2
          ON ctx2.contextlevel = 70
         AND ctx2.instanceid = cm2.id
        JOIN {files} f2 ON f2.contextid = ctx2.id
        WHERE cm2.course = %%COURSEID%%
          AND cm2.deletioninprogress = 0
          AND f2.filename <> '.'
          AND f2.filesize > 0
    )
    THEN '<a class="badge bg-secondary text-decoration-none" title="No files found">n/a</a>'
    WHEN EXISTS (
        SELECT 1
        FROM (SELECT %%COURSEID%% AS cid) p
        JOIN {course_modules} cm ON cm.course = p.cid
        JOIN {course_sections} cs ON cs.id = cm.section
        JOIN {modules} m ON m.id = cm.module
        JOIN {context} ctx
          ON ctx.contextlevel = 70
         AND ctx.instanceid = cm.id
        JOIN {files} f ON f.contextid = ctx.id
        WHERE cm.deletioninprogress = 0
          AND cm.visible = 1
          AND cs.visible = 1
          AND f.filename <> '.'
          AND f.filesize > 0
          AND (
              f.mimetype = 'application/pdf'
              OR LOWER(f.filename) LIKE '%.pdf'
          )
          AND f.component IN ('mod_resource', 'mod_page', 'mod_book', 'mod_folder', 'mod_label', 'mod_url')
          AND f.filearea IN ('content', 'chapter', 'intro')
          AND (
              LOWER(f.source) REGEXP '(jstor|sciencedirect|wiley|tandfonline|sagepub|springer|nature[.]com|academic[.]oup|cambridge[.]org|ebscohost|proquest|elsevier|cell[.]com|ieee|acm[.]org)'
              OR LOWER(f.filename) REGEXP '([(]|^)(19[0-9]{2}|200[0-9]|201[0-9]|202[0-6])([)]|$)'
              OR LOWER(f.filename) REGEXP 'et[ ]+al[.]'
              OR LOWER(f.filename) REGEXP '-[ ]*(19[0-9]{2}|200[0-9]|201[0-9]|202[0-6])[ ]*-'
          )
    )
    THEN CONCAT(
        '<a class="badge bg-danger text-decoration-none fail-badge" ',
        'href="%%WWWROOT%%/blo', 'cks/configurable_reports/viewreport.php',
        CHAR(63),
        'id=108&courseid=',
        %%COURSEID%%,
        '" target="_blank">Fail</a>'
    )
    ELSE CONCAT(
        '<a class="badge bg-success text-decoration-none pass-badge" ',
        'href="%%WWWROOT%%/blo', 'cks/configurable_reports/viewreport.php',
        CHAR(63),
        'id=108&courseid=',
        %%COURSEID%%,
        '" target="_blank">Pass</a>'
    )
END AS auditresult
FROM {course} c
WHERE c.id = %%COURSEID%%

UNION ALL

SELECT CONCAT(
    '<a href="',
    '%%WWWROOT%%/blo', 'cks/configurable_reports/viewreport.php',
    CHAR(63),
    'id=112&courseid=',
    %%COURSEID%%,
    '" target="_blank">09 Are summative assessment links available, with completion criteria</a>'
) AS audititem,
CASE
    WHEN EXISTS (
        SELECT 1
        FROM {customfield_field} f
        JOIN {customfield_data} d ON d.fieldid = f.id
        WHERE f.shortname = 'alt_assessment_format'
          AND d.instanceid = %%COURSEID%%
          AND CAST(COALESCE(d.intvalue, d.value) AS UNSIGNED) IN (2, 3, 4, 5, 6, 7)
    )
    THEN '<span class="badge bg-secondary">n/a</span>'
    WHEN EXISTS (
        SELECT 1
        FROM {course_modules} cm
        JOIN {modules} m ON m.id = cm.module
        JOIN {course_sections} cs ON cs.id = cm.section
        LEFT JOIN (
            SELECT
                ti.itemid AS cmid,
                MAX(CASE WHEN LOWER(tg.name) = 'summative' THEN 1 ELSE 0 END) AS has_summative,
                MAX(CASE WHEN LOWER(tg.name) = 'formative' THEN 1 ELSE 0 END) AS has_formative
            FROM {tag_instance} ti
            JOIN {tag} tg ON tg.id = ti.tagid
            WHERE ti.component = 'core'
              AND ti.itemtype = 'course_modules'
            GROUP BY ti.itemid
        ) tags ON tags.cmid = cm.id
        WHERE cm.course = %%COURSEID%%
          AND cm.visible = 1
          AND cs.visible = 1
          AND cm.deletioninprogress = 0
AND LOWER(TRIM(COALESCE(cs.name, ''))) IN (
    'assessment & feedback',
    'assessments & feedback',
    'assessment and feedback',
    'assessments and feedback'
)
          AND cm.completion > 0
          AND COALESCE(tags.has_formative, 0) = 0
          AND (
              m.name IN ('assign', 'quiz')
              OR m.name = CONCAT('turni', 'tin', 'tooltwo')
              OR COALESCE(tags.has_summative, 0) = 1
          )
    )
    THEN CONCAT(
        '<a class="badge bg-success text-decoration-none pass-badge" ',
        'href="%%WWWROOT%%/blo', 'cks/configurable_reports/viewreport.php',
        CHAR(63),
        'id=112&courseid=',
        %%COURSEID%%,
        '" target="_blank">Pass</a>'
    )
    ELSE CONCAT(
        '<a class="badge bg-danger text-decoration-none fail-badge" ',
        'href="%%WWWROOT%%/blo', 'cks/configurable_reports/viewreport.php',
        CHAR(63),
        'id=112&courseid=',
        %%COURSEID%%,
        '" target="_blank">Fail</a>'
    )
END AS auditresult
FROM {course} c
WHERE c.id = %%COURSEID%%

UNION ALL

SELECT CONCAT(
    '<a href="',
    '%%WWWROOT%%/blo', 'cks/configurable_reports/viewreport.php',
    CHAR(63),
    'id=110&courseid=',
    %%COURSEID%%,
    '" target="_blank">10 Are the due dates for your submissions visible on the course page</a>'
) AS audititem,
CASE
    WHEN EXISTS (
        SELECT 1
        FROM (
            SELECT CONCAT(
                ' ',
                LOWER(
                    REPLACE(
                        REPLACE(
                            REPLACE(
                                LEFT(COALESCE(src.txt, ''), 20000),
                                CHAR(10),
                                ' '
                            ),
                            CHAR(13),
                            ' '
                        ),
                        CONCAT('&nbsp', CHAR(59)),
                        ' '
                    )
                ),
                ' '
            ) AS txtl
            FROM (
                SELECT CONCAT(COALESCE(cs.name, ''), ' ', COALESCE(cs.summary, '')) AS txt
                FROM {course_sections} cs
                WHERE cs.course = %%COURSEID%%
                  AND cs.visible = 1
                  AND cs.section > 0

                UNION ALL

                SELECT COALESCE(lb.intro, '') AS txt
                FROM {course_modules} cm
                JOIN {modules} m
                  ON m.id = cm.module
                 AND m.name = 'label'
                JOIN {label} lb ON lb.id = cm.instance
                JOIN {course_sections} cs
                  ON cs.id = cm.section
                 AND cs.visible = 1
                WHERE cm.course = %%COURSEID%%
                  AND cm.visible = 1
                  AND cm.deletioninprogress = 0

                UNION ALL

                SELECT TRIM(
                    CONCAT(
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
                            pg.name,
                            qz.name,
                            rs.name,
                            sc.name,
                            ur.name,
                            wk.name,
                            ws.name,
                            lb2.name,
                            ''
                        ),
                        ' ',
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
                            pg.content,
                            qz.intro,
                            rs.intro,
                            sc.intro,
                            ur.intro,
                            wk.intro,
                            ws.intro,
                            lb2.intro,
                            ''
                        )
                    )
                ) AS txt
                FROM {course_modules} cm
                JOIN {modules} m ON m.id = cm.module
                JOIN {course_sections} cs
                  ON cs.id = cm.section
                 AND cs.visible = 1
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
                LEFT JOIN {page} pg ON pg.id = cm.instance AND m.name = 'page'
                LEFT JOIN {quiz} qz ON qz.id = cm.instance AND m.name = 'quiz'
                LEFT JOIN {resource} rs ON rs.id = cm.instance AND m.name = 'resource'
                LEFT JOIN {scorm} sc ON sc.id = cm.instance AND m.name = 'scorm'
                LEFT JOIN {url} ur ON ur.id = cm.instance AND m.name = 'url'
                LEFT JOIN {wiki} wk ON wk.id = cm.instance AND m.name = 'wiki'
                LEFT JOIN {workshop} ws ON ws.id = cm.instance AND m.name = 'workshop'
                LEFT JOIN {label} lb2 ON lb2.id = cm.instance AND m.name = 'label'
                WHERE cm.course = %%COURSEID%%
                  AND cm.visible = 1
                  AND cm.deletioninprogress = 0
                  AND m.name <> 'lti'
            ) src
        ) t
        WHERE (
            t.txtl LIKE '% submission %'
            OR t.txtl LIKE '% due %'
            OR t.txtl LIKE '% due on %'
            OR t.txtl LIKE '% submission date %'
            OR t.txtl LIKE '% submit by %'
            OR t.txtl LIKE '% submit before %'
            OR t.txtl LIKE '% deadline %'
            OR t.txtl LIKE '% closing date %'
            OR t.txtl LIKE '% closes on %'
            OR t.txtl LIKE '% cutoff %'
            OR t.txtl LIKE '% cut-off %'
            OR t.txtl LIKE '% dates %'
        )
          AND t.txtl NOT LIKE '%please ensure key assessment dates and essential assessment information%'
          AND t.txtl NOT LIKE '%are the due dates for your submissions visible on the course page%'
        LIMIT 1
    )
    THEN CONCAT(
        '<a class="badge bg-success text-decoration-none pass-badge" ',
        'href="%%WWWROOT%%/blo', 'cks/configurable_reports/viewreport.php',
        CHAR(63),
        'id=110&courseid=',
        %%COURSEID%%,
        '" target="_blank">Pass</a>'
    )
    ELSE CONCAT(
        '<a class="badge bg-danger text-decoration-none fail-badge" ',
        'href="%%WWWROOT%%/blo', 'cks/configurable_reports/viewreport.php',
        CHAR(63),
        'id=110&courseid=',
        %%COURSEID%%,
        '" target="_blank">Fail</a>'
    )
END AS auditresult
FROM {course} c
WHERE c.id = %%COURSEID%%

UNION ALL

SELECT CONCAT(
    '<a href="',
    '%%WWWROOT%%/blo', 'cks/configurable_reports/viewreport.php',
    CHAR(63),
    'id=113&courseid=',
    %%COURSEID%%,
    '" target="_blank">11 Checks whether the course includes at least one active learning activity.</a>'
) AS audititem,
CASE
    WHEN (
        EXISTS (
            SELECT 1
            FROM {course_modules} cm
            JOIN {modules} m ON m.id = cm.module
            LEFT JOIN {lti} l
              ON l.id = cm.instance
             AND m.name = 'lti'
            LEFT JOIN {lti_types} lt
              ON lt.id = l.typeid
             AND m.name = 'lti'
            WHERE cm.course = %%COURSEID%%
              AND cm.deletioninprogress = 0
              AND cm.visible = 1
              AND (
                  m.name IN (
                      'quiz',
                      'chat',
                      'checklist',
                      'choice',
                      'feedback',
                      'groupchoice',
                      'h5pactivity',
                      'hvp',
                      'questionnaire',
                      'workshop'
                  )
                  OR (
                      m.name = 'lti'
                      AND LOWER(TRIM(COALESCE(lt.name, ''))) LIKE '%ai feedback%'
                  )
              )
        )
        OR (
            SELECT COUNT(1)
            FROM {course_modules} cm2
            JOIN {course_sections} cs2 ON cs2.id = cm2.section
            WHERE cm2.course = %%COURSEID%%
              AND cm2.deletioninprogress = 0
              AND cm2.visible = 1
              AND cs2.visible = 1
              AND cm2.completion > 0
        ) BETWEEN 3 AND 10
    )
    THEN CONCAT(
        '<a class="badge bg-success text-decoration-none pass-badge" ',
        'href="%%WWWROOT%%/blo', 'cks/configurable_reports/viewreport.php',
        CHAR(63),
        'id=113&courseid=',
        %%COURSEID%%,
        '" target="_blank">Pass</a>'
    )
    ELSE CONCAT(
        '<a class="badge bg-danger text-decoration-none fail-badge" ',
        'href="%%WWWROOT%%/blo', 'cks/configurable_reports/viewreport.php',
        CHAR(63),
        'id=113&courseid=',
        %%COURSEID%%,
        '" target="_blank">Fail</a>'
    )
END AS auditresult
FROM {course} c
WHERE c.id = %%COURSEID%%
```

## Template Header

```
/<div class="card shadow-sm mb-3">
  <div class="card-header bg-light">
    <h3 class="h6 mb-1">Moodle Minimum Standards – Quick Checks</h3>
    <p class="text-muted small mb-0">Click on each check name to see information
      about the check. The <span class="badge bg-danger pass-badge">Fail</span>
      or <span class="badge bg-success fail-badge">Pass</span> badges indicate
      whether the criteria have been met. The <span
        class="badge bg-secondary">n/a</span> badge will show if there are no
      criteria to evaluate, or if you have indicated in the settings you are not
      using Moodle for summative assessment.  </p>
  </div>
  <div class="card-body p-0"><!-- “Header row” -->
    <div class="d-flex fw-bold border-bottom px-3 py-2 bg-light">
      <div class="flex-grow-1">Check</div>
      <div class="text-center" style="width: 180px;">Result</div>
    </div>
  </div>
</div>
```

## Template Record

```
<div class="d-flex border-bottom px-3 py-2 align-items-center">
  <div class="flex-grow-1">[[audititem]]</div>
  <div class="text-center" style="width: 180px;">[[auditresult]]</div>
</div>
```

