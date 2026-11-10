# SQL: Active Learning


[Download report XML](/moodle-baselines/assets/gitbook/11-min-standards-active-learning.xml){download}


```
SELECT
    z.iconhtml AS iconhtml,
    z.activityhtml AS activityhtml,
    z.activitytype AS activitytype,
    z.completionhtml AS completioncriteria,
    z.footerhtml AS suggestedfooter
FROM (
    SELECT
        0 AS sortkey,
        LOWER(TRIM(
                COALESCE(
                    asg.name,
                    qz.name,
                    ch.name,
                    fb.name,
                    h5.name,
                    ws.name,
                    bk.name,
                    dt.name,
                    fd.name,
                    fm.name,
                    gl.name,
                    ls.name,
                    pg.name,
                    rs.name,
                    sc.name,
                    ur.name,
                    wk.name,
                    l.name,
                    CONCAT('[', m.name, ' ', CHAR(35), cm.instance, ']')
                )
            )) AS sortname,
        CONCAT(
            '<img src="',
            '%%WWWROOT%%/theme/image.php/remui/mod_',
            m.name,
            '/0/icon',
            '" alt="',
            m.name,
            '" class="activityicon" />'
        ) AS iconhtml,
        CONCAT(
            '<a href="',
            '%%WWWROOT%%/mod/',
            m.name,
            '/view.php',
            CHAR(63),
            'id=',
            cm.id,
            '" target="_blank">',
            TRIM(
                COALESCE(
                    asg.name,
                    qz.name,
                    ch.name,
                    fb.name,
                    h5.name,
                    ws.name,
                    bk.name,
                    dt.name,
                    fd.name,
                    fm.name,
                    gl.name,
                    ls.name,
                    pg.name,
                    rs.name,
                    sc.name,
                    ur.name,
                    wk.name,
                    l.name,
                    CONCAT('[', m.name, ' ', CHAR(35), cm.instance, ']')
                )
            ),
            '</a>'
        ) AS activityhtml,
        CASE
                WHEN m.name = 'lti' THEN COALESCE(NULLIF(TRIM(lt.name), ''), 'External tool')
                WHEN m.name = 'quiz' THEN 'Quiz'
                WHEN m.name = 'chat' THEN 'Chat'
                WHEN m.name = 'checklist' THEN 'Checklist'
                WHEN m.name = 'choice' THEN 'Choice'
                WHEN m.name = 'feedback' THEN 'Feedback'
                WHEN m.name IN ('choicegroup', 'groupchoice') THEN 'Group choice'
                WHEN m.name = 'h5pactivity' THEN 'H5P activity'
                WHEN m.name = 'hvp' THEN 'H5P legacy activity'
                WHEN m.name = 'questionnaire' THEN 'Questionnaire'
                WHEN m.name = 'workshop' THEN 'Workshop'
                ELSE m.name
            END AS activitytype,
        CASE
            WHEN cm.completion > 0
             AND s.completioncount BETWEEN 3 AND 10
             AND NOT (
                        m.name IN (
                            'quiz',
                            'chat',
                            'checklist',
                            'choice',
                            'feedback',
                            'choicegroup',
                            'groupchoice',
                            'h5pactivity',
                            'hvp',
                            'questionnaire',
                            'workshop'
                        )
                        OR (
                            m.name = 'lti'
                            AND LOWER(TRIM(COALESCE(lt.name, ''))) IN (
                                'ai feedback',
                                'eon-xr',
                                'learnsci resources'
                            )
                        )
                    )
            THEN '<span class="text-success fw-bold">✔</span>'
            ELSE ''
        END AS completionhtml,
        CASE
            WHEN cm.id = (
                SELECT MAX(cm3.id)
                FROM {course_modules} cm3
                JOIN {modules} m3 ON m3.id = cm3.module
                JOIN {course_sections} cs3
                  ON cs3.id = cm3.section
                 AND cs3.visible = 1
                LEFT JOIN {lti} l3
                  ON l3.id = cm3.instance
                 AND m3.name = 'lti'
                LEFT JOIN {lti_types} lt3
                  ON lt3.id = l3.typeid
                 AND m3.name = 'lti'
                WHERE cm3.course = %%COURSEID%%
                  AND cm3.visible = 1
                  AND cm3.deletioninprogress = 0
                  AND m3.name <> CONCAT('turni', 'tin', 'tooltwo')
                  AND (
                        m3.name IN (
                            'quiz',
                            'chat',
                            'checklist',
                            'choice',
                            'feedback',
                            'choicegroup',
                            'groupchoice',
                            'h5pactivity',
                            'hvp',
                            'questionnaire',
                            'workshop'
                        )
                        OR (
                            m3.name = 'lti'
                            AND LOWER(TRIM(COALESCE(lt3.name, ''))) IN (
                                'ai feedback',
                                'eon-xr',
                                'learnsci resources'
                            )
                        )
                        OR (
                            cm3.completion > 0
                            AND s.completioncount BETWEEN 3 AND 10
                        )
                    )
            )
            THEN CONCAT(
                    '<div class="w-100 mt-2 px-3 py-2 bg-light border-top"><div class="small">',
                    '<strong>Active learning activities you could also use:</strong>',
                    CASE
                        WHEN (s.avail_quiz = 0 OR s.has_quiz = 1) AND
                            (s.avail_choice = 0 OR s.has_choice = 1) AND
                            (s.avail_feedback = 0 OR s.has_feedback = 1) AND
                            (s.avail_chat = 0 OR s.has_chat = 1) AND
                            (s.avail_checklist = 0 OR s.has_checklist = 1) AND
                            (s.avail_groupchoice = 0 OR s.has_groupchoice = 1) AND
                            (s.avail_h5pactivity = 0 OR s.has_h5pactivity = 1) AND
                            (s.avail_hvp = 0 OR s.has_hvp = 1) AND
                            (s.avail_questionnaire = 0 OR s.has_questionnaire = 1) AND
                            (s.avail_workshop = 0 OR s.has_workshop = 1) AND
                            (s.avail_ai_feedback = 0 OR s.has_ai_feedback = 1) AND
                            (s.avail_eon_xr = 0 OR s.has_eon_xr = 1) AND
                            (s.avail_learnsci = 0 OR s.has_learnsci = 1)
                        THEN '<div class="text-muted">All suggested active learning activities available on this site are already present in this course.</div>'
                        ELSE CONCAT(
                            '<ul class="mb-0">',
                            CASE
                                WHEN s.avail_quiz = 1 AND s.has_quiz = 0
                                THEN '<li><span title="Improves performance, retention, and conceptual understanding">Quiz</span></li>'
                                ELSE ''
                            END,
                            CASE
                                WHEN s.avail_choice = 1 AND s.has_choice = 0
                                THEN '<li><span title="Increases engagement and encourages participation through decision-making">Choice</span></li>'
                                ELSE ''
                            END,
                            CASE
                                WHEN s.avail_feedback = 1 AND s.has_feedback = 0
                                THEN '<li><span title="Supports reflection, engagement, and metacognition">Feedback</span></li>'
                                ELSE ''
                            END,
                            CASE
                                WHEN s.avail_chat = 1 AND s.has_chat = 0
                                THEN '<li><span title="Supports discussion, engagement, and deeper thinking">Chat</span></li>'
                                ELSE ''
                            END,
                            CASE
                                WHEN s.avail_checklist = 1 AND s.has_checklist = 0
                                THEN '<li><span title="Supports self-regulated learning, planning, and progress monitoring">Checklist</span></li>'
                                ELSE ''
                            END,
                            CASE
                                WHEN s.avail_groupchoice = 1 AND s.has_groupchoice = 0
                                THEN '<li><span title="Encourages participation, peer awareness, and collaborative decision-making">Group choice</span></li>'
                                ELSE ''
                            END,
                            CASE
                                WHEN s.avail_h5pactivity = 1 AND s.has_h5pactivity = 0
                                THEN '<li><span title="Supports engagement, interaction, and conceptual understanding">H5P activity</span></li>'
                                ELSE ''
                            END,
                            CASE
                                WHEN s.avail_hvp = 1 AND s.has_hvp = 0
                                THEN '<li><span title="Supports engagement, interaction, and conceptual understanding">H5P legacy activity</span></li>'
                                ELSE ''
                            END,
                            CASE
                                WHEN s.avail_questionnaire = 1 AND s.has_questionnaire = 0
                                THEN '<li><span title="Supports reflection, response, and learner self-awareness">Questionnaire</span></li>'
                                ELSE ''
                            END,
                            CASE
                                WHEN s.avail_workshop = 1 AND s.has_workshop = 0
                                THEN '<li><span title="Supports peer review, evaluation, and higher-order thinking">Workshop</span></li>'
                                ELSE ''
                            END,
                            CASE
                                WHEN s.avail_ai_feedback = 1 AND s.has_ai_feedback = 0
                                THEN '<li><span title="Supports timely personalised feedback and improved performance">AI Feedback (LTI)</span></li>'
                                ELSE ''
                            END,
                            CASE
                                WHEN s.avail_eon_xr = 1 AND s.has_eon_xr = 0
                                THEN '<li><span title="Supports immersive learning, engagement, and applied understanding">EON-XR (LTI)</span></li>'
                                ELSE ''
                            END,
                            CASE
                                WHEN s.avail_learnsci = 1 AND s.has_learnsci = 0
                                THEN '<li><span title="Supports conceptual understanding and improved performance through interactive learning resources">LearnSci Resources (LTI)</span></li>'
                                ELSE ''
                            END,
                            '</ul>'
                        )
                    END,
                    '</div></div>'
                )
            ELSE ''
        END AS footerhtml
    FROM {course_modules} cm
    JOIN {modules} m ON m.id = cm.module
    JOIN {course_sections} cs
      ON cs.id = cm.section
     AND cs.visible = 1
    LEFT JOIN {assign} asg ON asg.id = cm.instance AND m.name = 'assign'
        LEFT JOIN {quiz} qz ON qz.id = cm.instance AND m.name = 'quiz'
        LEFT JOIN {choice} ch ON ch.id = cm.instance AND m.name = 'choice'
        LEFT JOIN {feedback} fb ON fb.id = cm.instance AND m.name = 'feedback'
        LEFT JOIN {h5pactivity} h5 ON h5.id = cm.instance AND m.name = 'h5pactivity'
        LEFT JOIN {workshop} ws ON ws.id = cm.instance AND m.name = 'workshop'
        LEFT JOIN {book} bk ON bk.id = cm.instance AND m.name = 'book'
        LEFT JOIN {data} dt ON dt.id = cm.instance AND m.name = 'data'
        LEFT JOIN {folder} fd ON fd.id = cm.instance AND m.name = 'folder'
        LEFT JOIN {forum} fm ON fm.id = cm.instance AND m.name = 'forum'
        LEFT JOIN {glossary} gl ON gl.id = cm.instance AND m.name = 'glossary'
        LEFT JOIN {lesson} ls ON ls.id = cm.instance AND m.name = 'lesson'
        LEFT JOIN {page} pg ON pg.id = cm.instance AND m.name = 'page'
        LEFT JOIN {resource} rs ON rs.id = cm.instance AND m.name = 'resource'
        LEFT JOIN {scorm} sc ON sc.id = cm.instance AND m.name = 'scorm'
        LEFT JOIN {url} ur ON ur.id = cm.instance AND m.name = 'url'
        LEFT JOIN {wiki} wk ON wk.id = cm.instance AND m.name = 'wiki'
        LEFT JOIN {lti} l ON l.id = cm.instance AND m.name = 'lti'
        LEFT JOIN {lti_types} lt ON lt.id = l.typeid AND m.name = 'lti'
    JOIN (
        SELECT
            MAX(CASE WHEN mx.name = 'quiz' THEN 1 ELSE 0 END) AS has_quiz,
            MAX(CASE WHEN mx.name = 'choice' THEN 1 ELSE 0 END) AS has_choice,
            MAX(CASE WHEN mx.name = 'feedback' THEN 1 ELSE 0 END) AS has_feedback,
            MAX(CASE WHEN mx.name = 'chat' THEN 1 ELSE 0 END) AS has_chat,
            MAX(CASE WHEN mx.name = 'checklist' THEN 1 ELSE 0 END) AS has_checklist,
            MAX(CASE WHEN mx.name IN ('choicegroup', 'groupchoice') THEN 1 ELSE 0 END) AS has_groupchoice,
            MAX(CASE WHEN mx.name = 'h5pactivity' THEN 1 ELSE 0 END) AS has_h5pactivity,
            MAX(CASE WHEN mx.name = 'hvp' THEN 1 ELSE 0 END) AS has_hvp,
            MAX(CASE WHEN mx.name = 'questionnaire' THEN 1 ELSE 0 END) AS has_questionnaire,
            MAX(CASE WHEN mx.name = 'workshop' THEN 1 ELSE 0 END) AS has_workshop,
            MAX(CASE WHEN mx.name = 'lti' AND LOWER(TRIM(COALESCE(ltx.name, ''))) = 'ai feedback' THEN 1 ELSE 0 END) AS has_ai_feedback,
            MAX(CASE WHEN mx.name = 'lti' AND LOWER(TRIM(COALESCE(ltx.name, ''))) = 'eon-xr' THEN 1 ELSE 0 END) AS has_eon_xr,
            MAX(CASE WHEN mx.name = 'lti' AND LOWER(TRIM(COALESCE(ltx.name, ''))) = 'learnsci resources' THEN 1 ELSE 0 END) AS has_learnsci,
            SUM(CASE WHEN cmx.completion > 0 THEN 1 ELSE 0 END) AS completioncount,
            CASE WHEN EXISTS (SELECT 1 FROM {modules} mi WHERE mi.name = 'quiz') THEN 1 ELSE 0 END AS avail_quiz,
            CASE WHEN EXISTS (SELECT 1 FROM {modules} mi WHERE mi.name = 'choice') THEN 1 ELSE 0 END AS avail_choice,
            CASE WHEN EXISTS (SELECT 1 FROM {modules} mi WHERE mi.name = 'feedback') THEN 1 ELSE 0 END AS avail_feedback,
            CASE WHEN EXISTS (SELECT 1 FROM {modules} mi WHERE mi.name = 'chat') THEN 1 ELSE 0 END AS avail_chat,
            CASE WHEN EXISTS (SELECT 1 FROM {modules} mi WHERE mi.name = 'checklist') THEN 1 ELSE 0 END AS avail_checklist,
            CASE WHEN EXISTS (SELECT 1 FROM {modules} mi WHERE mi.name IN ('choicegroup', 'groupchoice')) THEN 1 ELSE 0 END AS avail_groupchoice,
            CASE WHEN EXISTS (SELECT 1 FROM {modules} mi WHERE mi.name = 'h5pactivity') THEN 1 ELSE 0 END AS avail_h5pactivity,
            CASE WHEN EXISTS (SELECT 1 FROM {modules} mi WHERE mi.name = 'hvp') THEN 1 ELSE 0 END AS avail_hvp,
            CASE WHEN EXISTS (SELECT 1 FROM {modules} mi WHERE mi.name = 'questionnaire') THEN 1 ELSE 0 END AS avail_questionnaire,
            CASE WHEN EXISTS (SELECT 1 FROM {modules} mi WHERE mi.name = 'workshop') THEN 1 ELSE 0 END AS avail_workshop,
            CASE WHEN EXISTS (SELECT 1 FROM {lti_types} ltr WHERE LOWER(TRIM(COALESCE(ltr.name, ''))) = 'ai feedback') THEN 1 ELSE 0 END AS avail_ai_feedback,
            CASE WHEN EXISTS (SELECT 1 FROM {lti_types} ltr WHERE LOWER(TRIM(COALESCE(ltr.name, ''))) = 'eon-xr') THEN 1 ELSE 0 END AS avail_eon_xr,
            CASE WHEN EXISTS (SELECT 1 FROM {lti_types} ltr WHERE LOWER(TRIM(COALESCE(ltr.name, ''))) = 'learnsci resources') THEN 1 ELSE 0 END AS avail_learnsci
        FROM {course_modules} cmx
        JOIN {modules} mx ON mx.id = cmx.module
        JOIN {course_sections} csx ON csx.id = cmx.section
        LEFT JOIN {lti} lx ON lx.id = cmx.instance AND mx.name = 'lti'
        LEFT JOIN {lti_types} ltx ON ltx.id = lx.typeid AND mx.name = 'lti'
        WHERE cmx.course = %%COURSEID%%
          AND cmx.visible = 1
          AND cmx.deletioninprogress = 0
          AND csx.visible = 1
    ) s ON 1 = 1
    WHERE cm.course = %%COURSEID%%
      AND cm.visible = 1
      AND cm.deletioninprogress = 0
      AND m.name <> CONCAT('turni', 'tin', 'tooltwo')
      AND (
                    m.name IN (
                        'quiz',
                        'chat',
                        'checklist',
                        'choice',
                        'feedback',
                        'choicegroup',
                        'groupchoice',
                        'h5pactivity',
                        'hvp',
                        'questionnaire',
                        'workshop'
                    )
                    OR (
                        m.name = 'lti'
                        AND LOWER(TRIM(COALESCE(lt.name, ''))) IN (
                            'ai feedback',
                            'eon-xr',
                            'learnsci resources'
                        )
                    )
                    OR (
                        cm.completion > 0
                        AND s.completioncount BETWEEN 3 AND 10
                    )
                )

    UNION ALL

    SELECT
        1 AS sortkey,
        '' AS sortname,
        '' AS iconhtml,
        CONCAT(
            '<span class="badge bg-warning text-dark me-2">Warning</span>',
            '<span class="fw-semibold">No active learning activities found in this course</span>'
        ) AS activityhtml,
        '' AS activitytype,
        '' AS completionhtml,
        CONCAT(
                    '<div class="w-100 mt-2 px-3 py-2 bg-light border-top"><div class="small">',
                    '<strong>Active learning activities you could also use:</strong>',
                    CASE
                        WHEN (s.avail_quiz = 0 OR s.has_quiz = 1) AND
                            (s.avail_choice = 0 OR s.has_choice = 1) AND
                            (s.avail_feedback = 0 OR s.has_feedback = 1) AND
                            (s.avail_chat = 0 OR s.has_chat = 1) AND
                            (s.avail_checklist = 0 OR s.has_checklist = 1) AND
                            (s.avail_groupchoice = 0 OR s.has_groupchoice = 1) AND
                            (s.avail_h5pactivity = 0 OR s.has_h5pactivity = 1) AND
                            (s.avail_hvp = 0 OR s.has_hvp = 1) AND
                            (s.avail_questionnaire = 0 OR s.has_questionnaire = 1) AND
                            (s.avail_workshop = 0 OR s.has_workshop = 1) AND
                            (s.avail_ai_feedback = 0 OR s.has_ai_feedback = 1) AND
                            (s.avail_eon_xr = 0 OR s.has_eon_xr = 1) AND
                            (s.avail_learnsci = 0 OR s.has_learnsci = 1)
                        THEN '<div class="text-muted">All suggested active learning activities available on this site are already present in this course.</div>'
                        ELSE CONCAT(
                            '<ul class="mb-0">',
                            CASE
                                WHEN s.avail_quiz = 1 AND s.has_quiz = 0
                                THEN '<li><span title="Improves performance, retention, and conceptual understanding">Quiz</span></li>'
                                ELSE ''
                            END,
                            CASE
                                WHEN s.avail_choice = 1 AND s.has_choice = 0
                                THEN '<li><span title="Increases engagement and encourages participation through decision-making">Choice</span></li>'
                                ELSE ''
                            END,
                            CASE
                                WHEN s.avail_feedback = 1 AND s.has_feedback = 0
                                THEN '<li><span title="Supports reflection, engagement, and metacognition">Feedback</span></li>'
                                ELSE ''
                            END,
                            CASE
                                WHEN s.avail_chat = 1 AND s.has_chat = 0
                                THEN '<li><span title="Supports discussion, engagement, and deeper thinking">Chat</span></li>'
                                ELSE ''
                            END,
                            CASE
                                WHEN s.avail_checklist = 1 AND s.has_checklist = 0
                                THEN '<li><span title="Supports self-regulated learning, planning, and progress monitoring">Checklist</span></li>'
                                ELSE ''
                            END,
                            CASE
                                WHEN s.avail_groupchoice = 1 AND s.has_groupchoice = 0
                                THEN '<li><span title="Encourages participation, peer awareness, and collaborative decision-making">Group choice</span></li>'
                                ELSE ''
                            END,
                            CASE
                                WHEN s.avail_h5pactivity = 1 AND s.has_h5pactivity = 0
                                THEN '<li><span title="Supports engagement, interaction, and conceptual understanding">H5P activity</span></li>'
                                ELSE ''
                            END,
                            CASE
                                WHEN s.avail_hvp = 1 AND s.has_hvp = 0
                                THEN '<li><span title="Supports engagement, interaction, and conceptual understanding">H5P legacy activity</span></li>'
                                ELSE ''
                            END,
                            CASE
                                WHEN s.avail_questionnaire = 1 AND s.has_questionnaire = 0
                                THEN '<li><span title="Supports reflection, response, and learner self-awareness">Questionnaire</span></li>'
                                ELSE ''
                            END,
                            CASE
                                WHEN s.avail_workshop = 1 AND s.has_workshop = 0
                                THEN '<li><span title="Supports peer review, evaluation, and higher-order thinking">Workshop</span></li>'
                                ELSE ''
                            END,
                            CASE
                                WHEN s.avail_ai_feedback = 1 AND s.has_ai_feedback = 0
                                THEN '<li><span title="Supports timely personalised feedback and improved performance">AI Feedback (LTI)</span></li>'
                                ELSE ''
                            END,
                            CASE
                                WHEN s.avail_eon_xr = 1 AND s.has_eon_xr = 0
                                THEN '<li><span title="Supports immersive learning, engagement, and applied understanding">EON-XR (LTI)</span></li>'
                                ELSE ''
                            END,
                            CASE
                                WHEN s.avail_learnsci = 1 AND s.has_learnsci = 0
                                THEN '<li><span title="Supports conceptual understanding and improved performance through interactive learning resources">LearnSci Resources (LTI)</span></li>'
                                ELSE ''
                            END,
                            '</ul>'
                        )
                    END,
                    '</div></div>'
                ) AS footerhtml
    FROM (
        SELECT
            MAX(CASE WHEN mx.name = 'quiz' THEN 1 ELSE 0 END) AS has_quiz,
            MAX(CASE WHEN mx.name = 'choice' THEN 1 ELSE 0 END) AS has_choice,
            MAX(CASE WHEN mx.name = 'feedback' THEN 1 ELSE 0 END) AS has_feedback,
            MAX(CASE WHEN mx.name = 'chat' THEN 1 ELSE 0 END) AS has_chat,
            MAX(CASE WHEN mx.name = 'checklist' THEN 1 ELSE 0 END) AS has_checklist,
            MAX(CASE WHEN mx.name IN ('choicegroup', 'groupchoice') THEN 1 ELSE 0 END) AS has_groupchoice,
            MAX(CASE WHEN mx.name = 'h5pactivity' THEN 1 ELSE 0 END) AS has_h5pactivity,
            MAX(CASE WHEN mx.name = 'hvp' THEN 1 ELSE 0 END) AS has_hvp,
            MAX(CASE WHEN mx.name = 'questionnaire' THEN 1 ELSE 0 END) AS has_questionnaire,
            MAX(CASE WHEN mx.name = 'workshop' THEN 1 ELSE 0 END) AS has_workshop,
            MAX(CASE WHEN mx.name = 'lti' AND LOWER(TRIM(COALESCE(ltx.name, ''))) = 'ai feedback' THEN 1 ELSE 0 END) AS has_ai_feedback,
            MAX(CASE WHEN mx.name = 'lti' AND LOWER(TRIM(COALESCE(ltx.name, ''))) = 'eon-xr' THEN 1 ELSE 0 END) AS has_eon_xr,
            MAX(CASE WHEN mx.name = 'lti' AND LOWER(TRIM(COALESCE(ltx.name, ''))) = 'learnsci resources' THEN 1 ELSE 0 END) AS has_learnsci,
            SUM(CASE WHEN cmx.completion > 0 THEN 1 ELSE 0 END) AS completioncount,
            CASE WHEN EXISTS (SELECT 1 FROM {modules} mi WHERE mi.name = 'quiz') THEN 1 ELSE 0 END AS avail_quiz,
            CASE WHEN EXISTS (SELECT 1 FROM {modules} mi WHERE mi.name = 'choice') THEN 1 ELSE 0 END AS avail_choice,
            CASE WHEN EXISTS (SELECT 1 FROM {modules} mi WHERE mi.name = 'feedback') THEN 1 ELSE 0 END AS avail_feedback,
            CASE WHEN EXISTS (SELECT 1 FROM {modules} mi WHERE mi.name = 'chat') THEN 1 ELSE 0 END AS avail_chat,
            CASE WHEN EXISTS (SELECT 1 FROM {modules} mi WHERE mi.name = 'checklist') THEN 1 ELSE 0 END AS avail_checklist,
            CASE WHEN EXISTS (SELECT 1 FROM {modules} mi WHERE mi.name IN ('choicegroup', 'groupchoice')) THEN 1 ELSE 0 END AS avail_groupchoice,
            CASE WHEN EXISTS (SELECT 1 FROM {modules} mi WHERE mi.name = 'h5pactivity') THEN 1 ELSE 0 END AS avail_h5pactivity,
            CASE WHEN EXISTS (SELECT 1 FROM {modules} mi WHERE mi.name = 'hvp') THEN 1 ELSE 0 END AS avail_hvp,
            CASE WHEN EXISTS (SELECT 1 FROM {modules} mi WHERE mi.name = 'questionnaire') THEN 1 ELSE 0 END AS avail_questionnaire,
            CASE WHEN EXISTS (SELECT 1 FROM {modules} mi WHERE mi.name = 'workshop') THEN 1 ELSE 0 END AS avail_workshop,
            CASE WHEN EXISTS (SELECT 1 FROM {lti_types} ltr WHERE LOWER(TRIM(COALESCE(ltr.name, ''))) = 'ai feedback') THEN 1 ELSE 0 END AS avail_ai_feedback,
            CASE WHEN EXISTS (SELECT 1 FROM {lti_types} ltr WHERE LOWER(TRIM(COALESCE(ltr.name, ''))) = 'eon-xr') THEN 1 ELSE 0 END AS avail_eon_xr,
            CASE WHEN EXISTS (SELECT 1 FROM {lti_types} ltr WHERE LOWER(TRIM(COALESCE(ltr.name, ''))) = 'learnsci resources') THEN 1 ELSE 0 END AS avail_learnsci
        FROM {course_modules} cmx
        JOIN {modules} mx ON mx.id = cmx.module
        JOIN {course_sections} csx ON csx.id = cmx.section
        LEFT JOIN {lti} lx ON lx.id = cmx.instance AND mx.name = 'lti'
        LEFT JOIN {lti_types} ltx ON ltx.id = lx.typeid AND mx.name = 'lti'
        WHERE cmx.course = %%COURSEID%%
          AND cmx.visible = 1
          AND cmx.deletioninprogress = 0
          AND csx.visible = 1
    ) s
    WHERE NOT EXISTS (
        SELECT 1
        FROM {course_modules} cm0
        JOIN {modules} m0 ON m0.id = cm0.module
        JOIN {course_sections} cs0
          ON cs0.id = cm0.section
         AND cs0.visible = 1
        LEFT JOIN {lti} l0
          ON l0.id = cm0.instance
         AND m0.name = 'lti'
        LEFT JOIN {lti_types} lt0
          ON lt0.id = l0.typeid
         AND m0.name = 'lti'
        WHERE cm0.course = %%COURSEID%%
          AND cm0.visible = 1
          AND cm0.deletioninprogress = 0
          AND m0.name <> CONCAT('turni', 'tin', 'tooltwo')
          AND (
              m0.name IN (
                  'quiz',
                  'chat',
                  'checklist',
                  'choice',
                  'feedback',
                  'choicegroup',
                  'groupchoice',
                  'h5pactivity',
                  'hvp',
                  'questionnaire',
                  'workshop'
              )
              OR (
                  m0.name = 'lti'
                  AND LOWER(TRIM(COALESCE(lt0.name, ''))) IN (
                      'ai feedback',
                      'eon-xr',
                      'learnsci resources'
                  )
              )
              OR (
                  cm0.completion > 0
                  AND s.completioncount BETWEEN 3 AND 10
              )
          )
    )
) z
WHERE 1 = 1
ORDER BY z.sortkey, z.sortname
```

## Template Header

```
<div class="card shadow-sm mb-3">
  <div class="card-header bg-light">
    <h3 class="h6 mb-1" style="font-size: 14px;" data-asw-orgfontsize="14">
      Activities Supporting Engagement &amp; Feedback (Active Learning)</h3>
    <p class="text-muted small mb-0" data-asw-orgfontsize="14"
      style="font-size: 14px;">This report lists key interactive and
      feedback-related activities in this course (e.g. quizzes, choice,
      feedback, H5P, AI feedback LTI) and any activities that use completion
      tracking when there are between 3 and 10 such activities overall. <a
        href="https://uelac.sharepoint.com/sites/centreforexcellenceinlearningandteaching591/SitePages/11-At-least-one-active-learning-activity.aspx"
        target="_blank" rel="noopener">Click here to view the guide for this
        report</a>.</p>
  </div>
  <div class="card-body p-0"><!-- Header row -->
    <div
      class="d-flex fw-bold border-bottom px-3 py-2 bg-light align-items-center">
      <div class="text-center" style="width: 32px;"><!-- icon header spacer -->
      </div>
      <div class="flex-grow-1">Activity</div>
      <div class="text-center" style="width: 180px;">Activity type</div>
      <div class="text-center" style="width: 200px;">Completion criteria</div>
    </div>
  </div>
</div>
```

## Template Record

```
<div class="al-row">
  <div class="al-cells d-flex border-bottom px-3 py-2 align-items-center">
    <div class="text-center" style="width: 32px;">[[iconhtml]]</div>
    <div class="flex-grow-1">[[activityhtml]]</div>
    <div class="text-center" style="width: 180px;">[[activitytype]]</div>
    <div class="text-center" style="width: 200px;">[[completioncriteria]]</div>
  </div>
  [[suggestedfooter]]
</div>
```
