# SQL: Due Dates


[Download report XML](/moodle-baselines/assets/gitbook/10-min-standards-due-dates-visible.xml){download}


```
SELECT z.RowHTML AS RowHTML
FROM (
    SELECT
        -1 AS sortbucket,
        -1 AS sectionnum,
        'aaa' AS itemtype,
        '' AS itemname,
        CONCAT(
            '<div class="px-3 py-3 border-bottom">',
            '<div class="alert alert-warning mb-0 w-100">',
            'There seems to be due date information on the course page, but it is not currently visible to students. ',
            'Please add due date information, or unhide the existing information',
            '</div>',
            '</div>'
        ) AS RowHTML
    FROM (SELECT 1 AS x) hiddenonly
    WHERE EXISTS (
        SELECT 1
        FROM (
            SELECT
            u.itemtype,
            u.sectionnum,
            u.modname,
            u.sectionname,
            u.itemname,
            u.titletxt,
            u.desctxt,
            u.descvisible,
            u.viewurl,
            CONCAT(
                ' ',
                LOWER(
                    REGEXP_REPLACE(
                        CONVERT(
                            REPLACE(
                                REPLACE(
                                    REPLACE(
                                        REPLACE(
                                            COALESCE(u.titletxt, ''),
                                            CONCAT('&nbsp', CHAR(59)),
                                            ' '
                                        ),
                                        CONVERT(0xC2A0 USING utf8mb4),
                                        ' '
                                    ),
                                    CHAR(10),
                                    ' '
                                ),
                                CHAR(13),
                                ' '
                            )
                            USING utf8mb4
                        ),
                        CONVERT('<[^>]+>' USING utf8mb4),
                        ' '
                    )
                ),
                ' '
            ) AS titlel,
            CONCAT(
                ' ',
                LOWER(
                    REGEXP_REPLACE(
                        CONVERT(
                            REPLACE(
                                REPLACE(
                                    REPLACE(
                                        REPLACE(
                                            COALESCE(u.desctxt, ''),
                                            CONCAT('&nbsp', CHAR(59)),
                                            ' '
                                        ),
                                        CONVERT(0xC2A0 USING utf8mb4),
                                        ' '
                                    ),
                                    CHAR(10),
                                    ' '
                                ),
                                CHAR(13),
                                ' '
                            )
                            USING utf8mb4
                        ),
                        CONVERT('<[^>]+>' USING utf8mb4),
                        ' '
                    )
                ),
                ' '
            ) AS descl,
            CONCAT(
                ' ',
                LOWER(
                    REGEXP_REPLACE(
                        CONVERT(
                            REPLACE(
                                REPLACE(
                                    REPLACE(
                                        REPLACE(
                                            COALESCE(CONCAT(COALESCE(u.titletxt, ''), ' ', COALESCE(u.desctxt, '')), ''),
                                            CONCAT('&nbsp', CHAR(59)),
                                            ' '
                                        ),
                                        CONVERT(0xC2A0 USING utf8mb4),
                                        ' '
                                    ),
                                    CHAR(10),
                                    ' '
                                ),
                                CHAR(13),
                                ' '
                            )
                            USING utf8mb4
                        ),
                        CONVERT('<[^>]+>' USING utf8mb4),
                        ' '
                    )
                ),
                ' '
            ) AS txtl,
            u.ishidden,
            u.itemurl
        FROM (
            SELECT
                'section' AS itemtype,
                cs.section AS sectionnum,
                '' AS modname,
                COALESCE(NULLIF(cs.name, ''), CONCAT('Section ', cs.section)) AS sectionname,
                COALESCE(NULLIF(cs.name, ''), CONCAT('Section ', cs.section)) AS itemname,
                COALESCE(NULLIF(cs.name, ''), CONCAT('Section ', cs.section)) AS titletxt,
                COALESCE(cs.summary, '') AS desctxt,
                1 AS descvisible,
                CASE WHEN cs.visible = 0 THEN 1 ELSE 0 END AS ishidden,
                CONCAT(
                    '%%WWWROOT%%/course/view.php',
                    CHAR(63),
                    'id=',
                    %%COURSEID%%,
                    CHAR(38),
                    'section=',
                    cs.section
                ) AS itemurl,
                '' AS viewurl
            FROM {course_sections} cs
            WHERE cs.course = %%COURSEID%%
              AND cs.section > 0

            UNION ALL

            SELECT
                'label' AS itemtype,
                cs.section AS sectionnum,
                'label' AS modname,
                COALESCE(NULLIF(cs.name, ''), CONCAT('Section ', cs.section)) AS sectionname,
                COALESCE(lb.name, 'Text and media area') AS itemname,
                COALESCE(lb.name, 'Text and media area') AS titletxt,
                COALESCE(lb.intro, '') AS desctxt,
                1 AS descvisible,
                CASE WHEN cs.visible = 0 OR cm.visible = 0 THEN 1 ELSE 0 END AS ishidden,
                CONCAT(
                    '%%WWWROOT%%/course/view.php',
                    CHAR(63),
                    'id=',
                    %%COURSEID%%,
                    CONCAT(CHAR(35), 'module-'),
                    cm.id
                ) AS itemurl,
                '' AS viewurl
            FROM {course_modules} cm
            JOIN {modules} m
              ON m.id = cm.module
             AND m.name = 'label'
            JOIN {label} lb ON lb.id = cm.instance
            JOIN {course_sections} cs ON cs.id = cm.section
            WHERE cm.course = %%COURSEID%%
              AND cm.deletioninprogress = 0

            UNION ALL

            SELECT
                'activity' AS itemtype,
                cs.section AS sectionnum,
                m.name AS modname,
                COALESCE(NULLIF(cs.name, ''), CONCAT('Section ', cs.section)) AS sectionname,
                TRIM(
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
                        CONCAT('[', m.name, ' ', CHAR(35), cm.instance, ']')
                    )
                ) AS itemname,
                TRIM(
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
                        CONCAT('[', m.name, ' ', CHAR(35), cm.instance, ']')
                    )
                ) AS titletxt,
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
                    pg.content,
                    qz.intro,
                    rs.intro,
                    sc.intro,
                    ur.intro,
                    wk.intro,
                    ws.intro,
                    ''
                ) AS desctxt,
                CASE WHEN COALESCE(cm.showdescription, 0) = 1 THEN 1 ELSE 0 END AS descvisible,
                CASE WHEN cs.visible = 0 OR cm.visible = 0 THEN 1 ELSE 0 END AS ishidden,
                CONCAT(
                    '%%WWWROOT%%/course/view.php',
                    CHAR(63),
                    'id=',
                    %%COURSEID%%,
                    CONCAT(CHAR(35), 'module-'),
                    cm.id
                ) AS itemurl,
                CONCAT(
                    '%%WWWROOT%%/mod/',
                    m.name,
                    '/view.php',
                    CHAR(63),
                    'id=',
                    cm.id
                ) AS viewurl
            FROM {course_modules} cm
            JOIN {modules} m ON m.id = cm.module
            JOIN {course_sections} cs ON cs.id = cm.section
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
            WHERE cm.course = %%COURSEID%%
              AND cm.deletioninprogress = 0
              AND m.name <> 'label'
        ) u
        ) anymatch
        WHERE (
            anymatch.txtl LIKE '% submission %'
            OR anymatch.txtl LIKE '% due %'
            OR anymatch.txtl LIKE '% due on %'
            OR anymatch.txtl LIKE '% submission date %'
            OR anymatch.txtl LIKE '% submit by %'
            OR anymatch.txtl LIKE '% submit before %'
            OR anymatch.txtl LIKE '% deadline %'
            OR anymatch.txtl LIKE '% closing date %'
            OR anymatch.txtl LIKE '% closes on %'
            OR anymatch.txtl LIKE '% cutoff %'
            OR anymatch.txtl LIKE '% cut-off %'
            OR anymatch.txtl LIKE '% dates %'
            OR anymatch.txtl REGEXP '[0-9]{1,2}(st|nd|rd|th){0,1}[ ]+(january|february|march|april|may|june|july|august|september|october|november|december)[ ]+20[0-9]{2}'
            OR anymatch.txtl REGEXP '[0-9]{1,2}[/-][0-9]{1,2}[/-]20[0-9]{2}'
            OR anymatch.txtl REGEXP '(january|february|march|april|may|june|july|august|september|october|november|december)[ ]+20[0-9]{2}'
        )
          AND anymatch.txtl NOT LIKE '%please ensure key assessment dates and essential assessment information%'
          AND anymatch.txtl NOT LIKE '%are the due dates for your submissions visible on the course page%'
        LIMIT 1
    )
      AND NOT EXISTS (
        SELECT 1
        FROM (
            SELECT
            u.itemtype,
            u.sectionnum,
            u.modname,
            u.sectionname,
            u.itemname,
            u.titletxt,
            u.desctxt,
            u.descvisible,
            u.viewurl,
            CONCAT(
                ' ',
                LOWER(
                    REGEXP_REPLACE(
                        CONVERT(
                            REPLACE(
                                REPLACE(
                                    REPLACE(
                                        REPLACE(
                                            COALESCE(u.titletxt, ''),
                                            CONCAT('&nbsp', CHAR(59)),
                                            ' '
                                        ),
                                        CONVERT(0xC2A0 USING utf8mb4),
                                        ' '
                                    ),
                                    CHAR(10),
                                    ' '
                                ),
                                CHAR(13),
                                ' '
                            )
                            USING utf8mb4
                        ),
                        CONVERT('<[^>]+>' USING utf8mb4),
                        ' '
                    )
                ),
                ' '
            ) AS titlel,
            CONCAT(
                ' ',
                LOWER(
                    REGEXP_REPLACE(
                        CONVERT(
                            REPLACE(
                                REPLACE(
                                    REPLACE(
                                        REPLACE(
                                            COALESCE(u.desctxt, ''),
                                            CONCAT('&nbsp', CHAR(59)),
                                            ' '
                                        ),
                                        CONVERT(0xC2A0 USING utf8mb4),
                                        ' '
                                    ),
                                    CHAR(10),
                                    ' '
                                ),
                                CHAR(13),
                                ' '
                            )
                            USING utf8mb4
                        ),
                        CONVERT('<[^>]+>' USING utf8mb4),
                        ' '
                    )
                ),
                ' '
            ) AS descl,
            CONCAT(
                ' ',
                LOWER(
                    REGEXP_REPLACE(
                        CONVERT(
                            REPLACE(
                                REPLACE(
                                    REPLACE(
                                        REPLACE(
                                            COALESCE(CONCAT(COALESCE(u.titletxt, ''), ' ', COALESCE(u.desctxt, '')), ''),
                                            CONCAT('&nbsp', CHAR(59)),
                                            ' '
                                        ),
                                        CONVERT(0xC2A0 USING utf8mb4),
                                        ' '
                                    ),
                                    CHAR(10),
                                    ' '
                                ),
                                CHAR(13),
                                ' '
                            )
                            USING utf8mb4
                        ),
                        CONVERT('<[^>]+>' USING utf8mb4),
                        ' '
                    )
                ),
                ' '
            ) AS txtl,
            u.ishidden,
            u.itemurl
        FROM (
            SELECT
                'section' AS itemtype,
                cs.section AS sectionnum,
                '' AS modname,
                COALESCE(NULLIF(cs.name, ''), CONCAT('Section ', cs.section)) AS sectionname,
                COALESCE(NULLIF(cs.name, ''), CONCAT('Section ', cs.section)) AS itemname,
                COALESCE(NULLIF(cs.name, ''), CONCAT('Section ', cs.section)) AS titletxt,
                COALESCE(cs.summary, '') AS desctxt,
                1 AS descvisible,
                CASE WHEN cs.visible = 0 THEN 1 ELSE 0 END AS ishidden,
                CONCAT(
                    '%%WWWROOT%%/course/view.php',
                    CHAR(63),
                    'id=',
                    %%COURSEID%%,
                    CHAR(38),
                    'section=',
                    cs.section
                ) AS itemurl,
                '' AS viewurl
            FROM {course_sections} cs
            WHERE cs.course = %%COURSEID%%
              AND cs.section > 0

            UNION ALL

            SELECT
                'label' AS itemtype,
                cs.section AS sectionnum,
                'label' AS modname,
                COALESCE(NULLIF(cs.name, ''), CONCAT('Section ', cs.section)) AS sectionname,
                COALESCE(lb.name, 'Text and media area') AS itemname,
                COALESCE(lb.name, 'Text and media area') AS titletxt,
                COALESCE(lb.intro, '') AS desctxt,
                1 AS descvisible,
                CASE WHEN cs.visible = 0 OR cm.visible = 0 THEN 1 ELSE 0 END AS ishidden,
                CONCAT(
                    '%%WWWROOT%%/course/view.php',
                    CHAR(63),
                    'id=',
                    %%COURSEID%%,
                    CONCAT(CHAR(35), 'module-'),
                    cm.id
                ) AS itemurl,
                '' AS viewurl
            FROM {course_modules} cm
            JOIN {modules} m
              ON m.id = cm.module
             AND m.name = 'label'
            JOIN {label} lb ON lb.id = cm.instance
            JOIN {course_sections} cs ON cs.id = cm.section
            WHERE cm.course = %%COURSEID%%
              AND cm.deletioninprogress = 0

            UNION ALL

            SELECT
                'activity' AS itemtype,
                cs.section AS sectionnum,
                m.name AS modname,
                COALESCE(NULLIF(cs.name, ''), CONCAT('Section ', cs.section)) AS sectionname,
                TRIM(
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
                        CONCAT('[', m.name, ' ', CHAR(35), cm.instance, ']')
                    )
                ) AS itemname,
                TRIM(
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
                        CONCAT('[', m.name, ' ', CHAR(35), cm.instance, ']')
                    )
                ) AS titletxt,
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
                    pg.content,
                    qz.intro,
                    rs.intro,
                    sc.intro,
                    ur.intro,
                    wk.intro,
                    ws.intro,
                    ''
                ) AS desctxt,
                CASE WHEN COALESCE(cm.showdescription, 0) = 1 THEN 1 ELSE 0 END AS descvisible,
                CASE WHEN cs.visible = 0 OR cm.visible = 0 THEN 1 ELSE 0 END AS ishidden,
                CONCAT(
                    '%%WWWROOT%%/course/view.php',
                    CHAR(63),
                    'id=',
                    %%COURSEID%%,
                    CONCAT(CHAR(35), 'module-'),
                    cm.id
                ) AS itemurl,
                CONCAT(
                    '%%WWWROOT%%/mod/',
                    m.name,
                    '/view.php',
                    CHAR(63),
                    'id=',
                    cm.id
                ) AS viewurl
            FROM {course_modules} cm
            JOIN {modules} m ON m.id = cm.module
            JOIN {course_sections} cs ON cs.id = cm.section
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
            WHERE cm.course = %%COURSEID%%
              AND cm.deletioninprogress = 0
              AND m.name <> 'label'
        ) u
        ) anyvisible
        WHERE anyvisible.ishidden = 0
          AND (
            anyvisible.txtl LIKE '% submission %'
            OR anyvisible.txtl LIKE '% due %'
            OR anyvisible.txtl LIKE '% due on %'
            OR anyvisible.txtl LIKE '% submission date %'
            OR anyvisible.txtl LIKE '% submit by %'
            OR anyvisible.txtl LIKE '% submit before %'
            OR anyvisible.txtl LIKE '% deadline %'
            OR anyvisible.txtl LIKE '% closing date %'
            OR anyvisible.txtl LIKE '% closes on %'
            OR anyvisible.txtl LIKE '% cutoff %'
            OR anyvisible.txtl LIKE '% cut-off %'
            OR anyvisible.txtl LIKE '% dates %'
            OR anyvisible.txtl REGEXP '[0-9]{1,2}(st|nd|rd|th){0,1}[ ]+(january|february|march|april|may|june|july|august|september|october|november|december)[ ]+20[0-9]{2}'
            OR anyvisible.txtl REGEXP '[0-9]{1,2}[/-][0-9]{1,2}[/-]20[0-9]{2}'
            OR anyvisible.txtl REGEXP '(january|february|march|april|may|june|july|august|september|october|november|december)[ ]+20[0-9]{2}'
        )
          AND anyvisible.txtl NOT LIKE '%please ensure key assessment dates and essential assessment information%'
          AND anyvisible.txtl NOT LIKE '%are the due dates for your submissions visible on the course page%'
        LIMIT 1
    )

    UNION ALL

    SELECT
        0 AS sortbucket,
        t.sectionnum AS sectionnum,
        t.itemtype AS itemtype,
        t.itemname AS itemname,
        CONCAT(
            '<div class="my-1 rounded overflow-hidden border">',
            '<div class="d-flex px-3 py-2 align-items-center" ',
            CASE WHEN t.ishidden = 1 THEN 'style="background-color:#f0f0f0"' ELSE 'style="background-color:#d1e7dd"' END,
            '>',
            '<div class="text-center me-2" style="width: 52px">',
            CASE
                WHEN t.itemtype = 'section' THEN CONCAT(
                    '<img src="',
                    '%%WWWROOT%%/pix/i/section.svg',
                    '" alt="Section" class="activityicon" />'
                )
                ELSE CONCAT(
                    '<img src="',
                    '%%WWWROOT%%/theme/image.php/remui/mod_',
                    t.modname,
                    '/0/icon',
                    '" alt="',
                    t.modname,
                    '" class="activityicon" />'
                )
            END,
            '</div>',
            '<div class="flex-grow-1">',
            '<div>',
            '<a href="',
            t.itemurl,
            '" target="_blank">',
            CASE WHEN t.itemtype = 'section' THEN t.sectionname ELSE t.itemname END,
            '</a>',
            CASE
                WHEN COALESCE(t.viewurl, '') <> '' THEN CONCAT(
                    ' <a href="',
                    t.viewurl,
                    '" target="_blank" title="Open activity page">',
                    '<i class="icon fa fa-external-link text-muted" aria-hidden="true"></i>',
                    '</a>'
                )
                ELSE ''
            END,
            CASE
                WHEN t.ishidden = 1 THEN ' <i class="icon fa fa-eye-slash text-muted" aria-hidden="true" title="Hidden from students"></i>'
                ELSE ''
            END,
            '</div>',
            '</div>',
            '<div class="text-center" style="width: 260px">',
            CASE
                    WHEN t.titlel LIKE '% submission %' AND t.descl LIKE '% submission %' THEN 'Title and description contain the word "submission"'
                    WHEN t.titlel LIKE '% submission %' THEN 'Title contains the word "submission"'
                    WHEN t.descl LIKE '% submission %' THEN 'Description contains the word "submission"'
                    WHEN t.titlel LIKE '% due on %' AND t.descl LIKE '% due on %' THEN 'Title and description contain the phrase "due on"'
                    WHEN t.titlel LIKE '% due on %' THEN 'Title contains the phrase "due on"'
                    WHEN t.descl LIKE '% due on %' THEN 'Description contains the phrase "due on"'
                    WHEN t.titlel LIKE '% due %' AND t.descl LIKE '% due %' THEN 'Title and description contain the word "due"'
                    WHEN t.titlel LIKE '% due %' THEN 'Title contains the word "due"'
                    WHEN t.descl LIKE '% due %' THEN 'Description contains the word "due"'
                    WHEN t.titlel LIKE '% submission date %' AND t.descl LIKE '% submission date %' THEN 'Title and description contain the phrase "submission date"'
                    WHEN t.titlel LIKE '% submission date %' THEN 'Title contains the phrase "submission date"'
                    WHEN t.descl LIKE '% submission date %' THEN 'Description contains the phrase "submission date"'
                    WHEN t.titlel LIKE '% submit by %' AND t.descl LIKE '% submit by %' THEN 'Title and description contain the phrase "submit by"'
                    WHEN t.titlel LIKE '% submit by %' THEN 'Title contains the phrase "submit by"'
                    WHEN t.descl LIKE '% submit by %' THEN 'Description contains the phrase "submit by"'
                    WHEN t.titlel LIKE '% submit before %' AND t.descl LIKE '% submit before %' THEN 'Title and description contain the phrase "submit before"'
                    WHEN t.titlel LIKE '% submit before %' THEN 'Title contains the phrase "submit before"'
                    WHEN t.descl LIKE '% submit before %' THEN 'Description contains the phrase "submit before"'
                    WHEN t.titlel LIKE '% deadline %' AND t.descl LIKE '% deadline %' THEN 'Title and description contain the word "deadline"'
                    WHEN t.titlel LIKE '% deadline %' THEN 'Title contains the word "deadline"'
                    WHEN t.descl LIKE '% deadline %' THEN 'Description contains the word "deadline"'
                    WHEN t.titlel LIKE '% closing date %' AND t.descl LIKE '% closing date %' THEN 'Title and description contain the phrase "closing date"'
                    WHEN t.titlel LIKE '% closing date %' THEN 'Title contains the phrase "closing date"'
                    WHEN t.descl LIKE '% closing date %' THEN 'Description contains the phrase "closing date"'
                    WHEN t.titlel LIKE '% closes on %' AND t.descl LIKE '% closes on %' THEN 'Title and description contain the phrase "closes on"'
                    WHEN t.titlel LIKE '% closes on %' THEN 'Title contains the phrase "closes on"'
                    WHEN t.descl LIKE '% closes on %' THEN 'Description contains the phrase "closes on"'
                    WHEN t.titlel LIKE '% cutoff %' AND t.descl LIKE '% cutoff %' THEN 'Title and description contain the word "cutoff"'
                    WHEN t.titlel LIKE '% cutoff %' THEN 'Title contains the word "cutoff"'
                    WHEN t.descl LIKE '% cutoff %' THEN 'Description contains the word "cutoff"'
                    WHEN t.titlel LIKE '% cut-off %' AND t.descl LIKE '% cut-off %' THEN 'Title and description contain the word "cut-off"'
                    WHEN t.titlel LIKE '% cut-off %' THEN 'Title contains the word "cut-off"'
                    WHEN t.descl LIKE '% cut-off %' THEN 'Description contains the word "cut-off"'
                    WHEN t.titlel LIKE '% dates %' AND t.descl LIKE '% dates %' THEN 'Title and description contain the word "dates"'
                    WHEN t.titlel LIKE '% dates %' THEN 'Title contains the word "dates"'
                    WHEN t.descl LIKE '% dates %' THEN 'Description contains the word "dates"'
                    WHEN t.titlel REGEXP '[0-9]{1,2}(st|nd|rd|th){0,1}[ ]+(january|february|march|april|may|june|july|august|september|october|november|december)[ ]+20[0-9]{2}' AND t.descl REGEXP '[0-9]{1,2}(st|nd|rd|th){0,1}[ ]+(january|february|march|april|may|june|july|august|september|october|november|december)[ ]+20[0-9]{2}' THEN 'Title and description contain a written date'
                    WHEN t.titlel REGEXP '[0-9]{1,2}(st|nd|rd|th){0,1}[ ]+(january|february|march|april|may|june|july|august|september|october|november|december)[ ]+20[0-9]{2}' THEN 'Title contains a written date'
                    WHEN t.descl REGEXP '[0-9]{1,2}(st|nd|rd|th){0,1}[ ]+(january|february|march|april|may|june|july|august|september|october|november|december)[ ]+20[0-9]{2}' THEN 'Description contains a written date'
                    WHEN t.titlel REGEXP '[0-9]{1,2}[/-][0-9]{1,2}[/-]20[0-9]{2}' AND t.descl REGEXP '[0-9]{1,2}[/-][0-9]{1,2}[/-]20[0-9]{2}' THEN 'Title and description contain a numeric date'
                    WHEN t.titlel REGEXP '[0-9]{1,2}[/-][0-9]{1,2}[/-]20[0-9]{2}' THEN 'Title contains a numeric date'
                    WHEN t.descl REGEXP '[0-9]{1,2}[/-][0-9]{1,2}[/-]20[0-9]{2}' THEN 'Description contains a numeric date'
                    WHEN t.titlel REGEXP '(january|february|march|april|may|june|july|august|september|october|november|december)[ ]+20[0-9]{2}' AND t.descl REGEXP '(january|february|march|april|may|june|july|august|september|october|november|december)[ ]+20[0-9]{2}' THEN 'Title and description contain a month and year'
                    WHEN t.titlel REGEXP '(january|february|march|april|may|june|july|august|september|october|november|december)[ ]+20[0-9]{2}' THEN 'Title contains a month and year'
                    WHEN t.descl REGEXP '(january|february|march|april|may|june|july|august|september|october|november|december)[ ]+20[0-9]{2}' THEN 'Description contains a month and year'
                    ELSE 'Matches a due-date or date pattern'
                END,
            CASE
                WHEN t.itemtype = 'activity'
                 AND t.descvisible = 0
                 AND (
                            t.descl LIKE '% submission %'
                            OR t.descl LIKE '% due %'
                            OR t.descl LIKE '% due on %'
                            OR t.descl LIKE '% submission date %'
                            OR t.descl LIKE '% submit by %'
                            OR t.descl LIKE '% submit before %'
                            OR t.descl LIKE '% deadline %'
                            OR t.descl LIKE '% closing date %'
                            OR t.descl LIKE '% closes on %'
                            OR t.descl LIKE '% cutoff %'
                            OR t.descl LIKE '% cut-off %'
                            OR t.descl LIKE '% dates %'
                            OR t.descl REGEXP '[0-9]{1,2}(st|nd|rd|th){0,1}[ ]+(january|february|march|april|may|june|july|august|september|october|november|december)[ ]+20[0-9]{2}'
                            OR t.descl REGEXP '[0-9]{1,2}[/-][0-9]{1,2}[/-]20[0-9]{2}'
                            OR t.descl REGEXP '(january|february|march|april|may|june|july|august|september|october|november|december)[ ]+20[0-9]{2}'
                        )
                THEN ' <i class="icon fa fa-exclamation-triangle text-muted" aria-hidden="true" title="The due-date match is in the description, but the description is not displayed on the course page"></i>'
                ELSE ''
            END,
            '</div>',
            '</div>',
            '</div>'
        ) AS RowHTML
    FROM (
        SELECT
            u.itemtype,
            u.sectionnum,
            u.modname,
            u.sectionname,
            u.itemname,
            u.titletxt,
            u.desctxt,
            u.descvisible,
            u.viewurl,
            CONCAT(
                ' ',
                LOWER(
                    REGEXP_REPLACE(
                        CONVERT(
                            REPLACE(
                                REPLACE(
                                    REPLACE(
                                        REPLACE(
                                            COALESCE(u.titletxt, ''),
                                            CONCAT('&nbsp', CHAR(59)),
                                            ' '
                                        ),
                                        CONVERT(0xC2A0 USING utf8mb4),
                                        ' '
                                    ),
                                    CHAR(10),
                                    ' '
                                ),
                                CHAR(13),
                                ' '
                            )
                            USING utf8mb4
                        ),
                        CONVERT('<[^>]+>' USING utf8mb4),
                        ' '
                    )
                ),
                ' '
            ) AS titlel,
            CONCAT(
                ' ',
                LOWER(
                    REGEXP_REPLACE(
                        CONVERT(
                            REPLACE(
                                REPLACE(
                                    REPLACE(
                                        REPLACE(
                                            COALESCE(u.desctxt, ''),
                                            CONCAT('&nbsp', CHAR(59)),
                                            ' '
                                        ),
                                        CONVERT(0xC2A0 USING utf8mb4),
                                        ' '
                                    ),
                                    CHAR(10),
                                    ' '
                                ),
                                CHAR(13),
                                ' '
                            )
                            USING utf8mb4
                        ),
                        CONVERT('<[^>]+>' USING utf8mb4),
                        ' '
                    )
                ),
                ' '
            ) AS descl,
            CONCAT(
                ' ',
                LOWER(
                    REGEXP_REPLACE(
                        CONVERT(
                            REPLACE(
                                REPLACE(
                                    REPLACE(
                                        REPLACE(
                                            COALESCE(CONCAT(COALESCE(u.titletxt, ''), ' ', COALESCE(u.desctxt, '')), ''),
                                            CONCAT('&nbsp', CHAR(59)),
                                            ' '
                                        ),
                                        CONVERT(0xC2A0 USING utf8mb4),
                                        ' '
                                    ),
                                    CHAR(10),
                                    ' '
                                ),
                                CHAR(13),
                                ' '
                            )
                            USING utf8mb4
                        ),
                        CONVERT('<[^>]+>' USING utf8mb4),
                        ' '
                    )
                ),
                ' '
            ) AS txtl,
            u.ishidden,
            u.itemurl
        FROM (
            SELECT
                'section' AS itemtype,
                cs.section AS sectionnum,
                '' AS modname,
                COALESCE(NULLIF(cs.name, ''), CONCAT('Section ', cs.section)) AS sectionname,
                COALESCE(NULLIF(cs.name, ''), CONCAT('Section ', cs.section)) AS itemname,
                COALESCE(NULLIF(cs.name, ''), CONCAT('Section ', cs.section)) AS titletxt,
                COALESCE(cs.summary, '') AS desctxt,
                1 AS descvisible,
                CASE WHEN cs.visible = 0 THEN 1 ELSE 0 END AS ishidden,
                CONCAT(
                    '%%WWWROOT%%/course/view.php',
                    CHAR(63),
                    'id=',
                    %%COURSEID%%,
                    CHAR(38),
                    'section=',
                    cs.section
                ) AS itemurl,
                '' AS viewurl
            FROM {course_sections} cs
            WHERE cs.course = %%COURSEID%%
              AND cs.section > 0

            UNION ALL

            SELECT
                'label' AS itemtype,
                cs.section AS sectionnum,
                'label' AS modname,
                COALESCE(NULLIF(cs.name, ''), CONCAT('Section ', cs.section)) AS sectionname,
                COALESCE(lb.name, 'Text and media area') AS itemname,
                COALESCE(lb.name, 'Text and media area') AS titletxt,
                COALESCE(lb.intro, '') AS desctxt,
                1 AS descvisible,
                CASE WHEN cs.visible = 0 OR cm.visible = 0 THEN 1 ELSE 0 END AS ishidden,
                CONCAT(
                    '%%WWWROOT%%/course/view.php',
                    CHAR(63),
                    'id=',
                    %%COURSEID%%,
                    CONCAT(CHAR(35), 'module-'),
                    cm.id
                ) AS itemurl,
                '' AS viewurl
            FROM {course_modules} cm
            JOIN {modules} m
              ON m.id = cm.module
             AND m.name = 'label'
            JOIN {label} lb ON lb.id = cm.instance
            JOIN {course_sections} cs ON cs.id = cm.section
            WHERE cm.course = %%COURSEID%%
              AND cm.deletioninprogress = 0

            UNION ALL

            SELECT
                'activity' AS itemtype,
                cs.section AS sectionnum,
                m.name AS modname,
                COALESCE(NULLIF(cs.name, ''), CONCAT('Section ', cs.section)) AS sectionname,
                TRIM(
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
                        CONCAT('[', m.name, ' ', CHAR(35), cm.instance, ']')
                    )
                ) AS itemname,
                TRIM(
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
                        CONCAT('[', m.name, ' ', CHAR(35), cm.instance, ']')
                    )
                ) AS titletxt,
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
                    pg.content,
                    qz.intro,
                    rs.intro,
                    sc.intro,
                    ur.intro,
                    wk.intro,
                    ws.intro,
                    ''
                ) AS desctxt,
                CASE WHEN COALESCE(cm.showdescription, 0) = 1 THEN 1 ELSE 0 END AS descvisible,
                CASE WHEN cs.visible = 0 OR cm.visible = 0 THEN 1 ELSE 0 END AS ishidden,
                CONCAT(
                    '%%WWWROOT%%/course/view.php',
                    CHAR(63),
                    'id=',
                    %%COURSEID%%,
                    CONCAT(CHAR(35), 'module-'),
                    cm.id
                ) AS itemurl,
                CONCAT(
                    '%%WWWROOT%%/mod/',
                    m.name,
                    '/view.php',
                    CHAR(63),
                    'id=',
                    cm.id
                ) AS viewurl
            FROM {course_modules} cm
            JOIN {modules} m ON m.id = cm.module
            JOIN {course_sections} cs ON cs.id = cm.section
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
            WHERE cm.course = %%COURSEID%%
              AND cm.deletioninprogress = 0
              AND m.name <> 'label'
        ) u
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
            OR t.txtl REGEXP '[0-9]{1,2}(st|nd|rd|th){0,1}[ ]+(january|february|march|april|may|june|july|august|september|october|november|december)[ ]+20[0-9]{2}'
            OR t.txtl REGEXP '[0-9]{1,2}[/-][0-9]{1,2}[/-]20[0-9]{2}'
            OR t.txtl REGEXP '(january|february|march|april|may|june|july|august|september|october|november|december)[ ]+20[0-9]{2}'
        )
      AND t.txtl NOT LIKE '%please ensure key assessment dates and essential assessment information%'
          AND t.txtl NOT LIKE '%are the due dates for your submissions visible on the course page%'

    UNION ALL

    SELECT
        1 AS sortbucket,
        999999 AS sectionnum,
        'zzz' AS itemtype,
        '' AS itemname,
        CONCAT(
            '<div class="px-3 py-3 border-bottom">',
            '<div class="alert alert-warning mb-0 w-100">',
            'This report cannot find a specific reference to due dates on the course page. ',
            'Please ensure your due dates are posted somewhere clearly visible for students to see.',
            '</div>',
            '</div>'
        ) AS RowHTML
    FROM (SELECT 1 AS x) nomatch
    WHERE NOT EXISTS (
        SELECT 1
        FROM (
            SELECT
            u.itemtype,
            u.sectionnum,
            u.modname,
            u.sectionname,
            u.itemname,
            u.titletxt,
            u.desctxt,
            u.descvisible,
            u.viewurl,
            CONCAT(
                ' ',
                LOWER(
                    REGEXP_REPLACE(
                        CONVERT(
                            REPLACE(
                                REPLACE(
                                    REPLACE(
                                        REPLACE(
                                            COALESCE(u.titletxt, ''),
                                            CONCAT('&nbsp', CHAR(59)),
                                            ' '
                                        ),
                                        CONVERT(0xC2A0 USING utf8mb4),
                                        ' '
                                    ),
                                    CHAR(10),
                                    ' '
                                ),
                                CHAR(13),
                                ' '
                            )
                            USING utf8mb4
                        ),
                        CONVERT('<[^>]+>' USING utf8mb4),
                        ' '
                    )
                ),
                ' '
            ) AS titlel,
            CONCAT(
                ' ',
                LOWER(
                    REGEXP_REPLACE(
                        CONVERT(
                            REPLACE(
                                REPLACE(
                                    REPLACE(
                                        REPLACE(
                                            COALESCE(u.desctxt, ''),
                                            CONCAT('&nbsp', CHAR(59)),
                                            ' '
                                        ),
                                        CONVERT(0xC2A0 USING utf8mb4),
                                        ' '
                                    ),
                                    CHAR(10),
                                    ' '
                                ),
                                CHAR(13),
                                ' '
                            )
                            USING utf8mb4
                        ),
                        CONVERT('<[^>]+>' USING utf8mb4),
                        ' '
                    )
                ),
                ' '
            ) AS descl,
            CONCAT(
                ' ',
                LOWER(
                    REGEXP_REPLACE(
                        CONVERT(
                            REPLACE(
                                REPLACE(
                                    REPLACE(
                                        REPLACE(
                                            COALESCE(CONCAT(COALESCE(u.titletxt, ''), ' ', COALESCE(u.desctxt, '')), ''),
                                            CONCAT('&nbsp', CHAR(59)),
                                            ' '
                                        ),
                                        CONVERT(0xC2A0 USING utf8mb4),
                                        ' '
                                    ),
                                    CHAR(10),
                                    ' '
                                ),
                                CHAR(13),
                                ' '
                            )
                            USING utf8mb4
                        ),
                        CONVERT('<[^>]+>' USING utf8mb4),
                        ' '
                    )
                ),
                ' '
            ) AS txtl,
            u.ishidden,
            u.itemurl
        FROM (
            SELECT
                'section' AS itemtype,
                cs.section AS sectionnum,
                '' AS modname,
                COALESCE(NULLIF(cs.name, ''), CONCAT('Section ', cs.section)) AS sectionname,
                COALESCE(NULLIF(cs.name, ''), CONCAT('Section ', cs.section)) AS itemname,
                COALESCE(NULLIF(cs.name, ''), CONCAT('Section ', cs.section)) AS titletxt,
                COALESCE(cs.summary, '') AS desctxt,
                1 AS descvisible,
                CASE WHEN cs.visible = 0 THEN 1 ELSE 0 END AS ishidden,
                CONCAT(
                    '%%WWWROOT%%/course/view.php',
                    CHAR(63),
                    'id=',
                    %%COURSEID%%,
                    CHAR(38),
                    'section=',
                    cs.section
                ) AS itemurl,
                '' AS viewurl
            FROM {course_sections} cs
            WHERE cs.course = %%COURSEID%%
              AND cs.section > 0

            UNION ALL

            SELECT
                'label' AS itemtype,
                cs.section AS sectionnum,
                'label' AS modname,
                COALESCE(NULLIF(cs.name, ''), CONCAT('Section ', cs.section)) AS sectionname,
                COALESCE(lb.name, 'Text and media area') AS itemname,
                COALESCE(lb.name, 'Text and media area') AS titletxt,
                COALESCE(lb.intro, '') AS desctxt,
                1 AS descvisible,
                CASE WHEN cs.visible = 0 OR cm.visible = 0 THEN 1 ELSE 0 END AS ishidden,
                CONCAT(
                    '%%WWWROOT%%/course/view.php',
                    CHAR(63),
                    'id=',
                    %%COURSEID%%,
                    CONCAT(CHAR(35), 'module-'),
                    cm.id
                ) AS itemurl,
                '' AS viewurl
            FROM {course_modules} cm
            JOIN {modules} m
              ON m.id = cm.module
             AND m.name = 'label'
            JOIN {label} lb ON lb.id = cm.instance
            JOIN {course_sections} cs ON cs.id = cm.section
            WHERE cm.course = %%COURSEID%%
              AND cm.deletioninprogress = 0

            UNION ALL

            SELECT
                'activity' AS itemtype,
                cs.section AS sectionnum,
                m.name AS modname,
                COALESCE(NULLIF(cs.name, ''), CONCAT('Section ', cs.section)) AS sectionname,
                TRIM(
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
                        CONCAT('[', m.name, ' ', CHAR(35), cm.instance, ']')
                    )
                ) AS itemname,
                TRIM(
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
                        CONCAT('[', m.name, ' ', CHAR(35), cm.instance, ']')
                    )
                ) AS titletxt,
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
                    pg.content,
                    qz.intro,
                    rs.intro,
                    sc.intro,
                    ur.intro,
                    wk.intro,
                    ws.intro,
                    ''
                ) AS desctxt,
                CASE WHEN COALESCE(cm.showdescription, 0) = 1 THEN 1 ELSE 0 END AS descvisible,
                CASE WHEN cs.visible = 0 OR cm.visible = 0 THEN 1 ELSE 0 END AS ishidden,
                CONCAT(
                    '%%WWWROOT%%/course/view.php',
                    CHAR(63),
                    'id=',
                    %%COURSEID%%,
                    CONCAT(CHAR(35), 'module-'),
                    cm.id
                ) AS itemurl,
                CONCAT(
                    '%%WWWROOT%%/mod/',
                    m.name,
                    '/view.php',
                    CHAR(63),
                    'id=',
                    cm.id
                ) AS viewurl
            FROM {course_modules} cm
            JOIN {modules} m ON m.id = cm.module
            JOIN {course_sections} cs ON cs.id = cm.section
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
            WHERE cm.course = %%COURSEID%%
              AND cm.deletioninprogress = 0
              AND m.name <> 'label'
        ) u
        ) anymatch
        WHERE (
            anymatch.txtl LIKE '% submission %'
            OR anymatch.txtl LIKE '% due %'
            OR anymatch.txtl LIKE '% due on %'
            OR anymatch.txtl LIKE '% submission date %'
            OR anymatch.txtl LIKE '% submit by %'
            OR anymatch.txtl LIKE '% submit before %'
            OR anymatch.txtl LIKE '% deadline %'
            OR anymatch.txtl LIKE '% closing date %'
            OR anymatch.txtl LIKE '% closes on %'
            OR anymatch.txtl LIKE '% cutoff %'
            OR anymatch.txtl LIKE '% cut-off %'
            OR anymatch.txtl LIKE '% dates %'
            OR anymatch.txtl REGEXP '[0-9]{1,2}(st|nd|rd|th){0,1}[ ]+(january|february|march|april|may|june|july|august|september|october|november|december)[ ]+20[0-9]{2}'
            OR anymatch.txtl REGEXP '[0-9]{1,2}[/-][0-9]{1,2}[/-]20[0-9]{2}'
            OR anymatch.txtl REGEXP '(january|february|march|april|may|june|july|august|september|october|november|december)[ ]+20[0-9]{2}'
        )
          AND anymatch.txtl NOT LIKE '%please ensure key assessment dates and essential assessment information%'
          AND anymatch.txtl NOT LIKE '%are the due dates for your submissions visible on the course page%'
        LIMIT 1
    )
) z
WHERE 1 = 1
ORDER BY z.sortbucket, z.sectionnum, z.itemtype, z.itemname
```

## Template Header

```
<div class="card shadow-sm mb-3">
  <div class="card-header bg-light">
    <h3 class="h6 mb-1" style="font-size: 14px;" data-asw-orgfontsize="14">
      Due-Dates in Sections &amp; Activities</h3>
    <p class="text-muted small mb-0" data-asw-orgfontsize="14"
      style="font-size: 14px;">This report lists sections, text and media areas,
      and activities whose text or description contains due-date or deadline
      phrases (e.g. "due on", "submission date", "submit by"). Hidden items are
      shown with a grey background and marked as hidden.  If you see this <i
        class="icon fa fa-exclamation-triangle text-muted"
        aria-hidden="true"></i>, it indicates that the due-date match is in the
      description, but the description is not visible on the course page. <a
        href="https://uelac.sharepoint.com/sites/centreforexcellenceinlearningandteaching591/SitePages/10-Due-dates-are-visible-on-course-page.aspx"
        target="_blank" rel="noopener">Click here to view the guide for this
        report</a>.</p>
  </div>
  <div class="card-body p-0"><!-- Header row -->
    <div
      class="d-flex fw-bold border-bottom px-3 py-2 bg-light align-items-center">
      <div class="text-center" style="width: 32px;"><!-- icon header spacer -->
      </div>
      <div class="flex-grow-1">Section / activity</div>
      <div class="text-center" style="width: 260px;">Matched phrase</div>
    </div>
  </div>
</div>
```

## Template Record

```
<p>[[RowHTML]]</p>
```
