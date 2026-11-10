# SQL: Copyright


[Download report XML](/moodle-baselines/assets/gitbook/08-min-standards-no-copyrighted-files.xml){download}


```
SELECT
    q.rowhtml AS Result
FROM (
    SELECT
        x.studentvisible,
        CONCAT(
            '<div class="',
            CASE
                WHEN x.studentvisible = 1 THEN 'alert alert-warning'
                ELSE 'alert alert-secondary'
            END,
            '" style="border:1px solid ',
            CASE
                WHEN x.studentvisible = 1 THEN '#f0e6a6'
                ELSE '#d6d8db'
            END,
            '">',
              CASE
                  WHEN x.studentvisible = 1 THEN '<b>Visible to students</b><br>'
                  ELSE '<b>Hidden from students</b><br>'
              END,
              '<a href="', '%%WWWROOT%%',
              '/pluginfile.php/', x.contextid, '/', x.component, '/', x.filearea, '/',
              x.itemid, x.filepath, x.filename,
              '" target="_blank">',
              x.filename,
              '</a> ',
              CASE
                  WHEN x.studentvisible = 1 THEN CONCAT(
                      '<a href="', '%%WWWROOT%%/course/mod.php', CHAR(63), 'sesskey=',
                      '%7Bsesskey%7D',
                      CHAR(38), 'hi', 'de=', x.cmid,
                      '" target="_blank" class="text-muted ms-1" title="Hide activity">',
                      '<i class="fa fa-eye-slash"></i>',
                      '</a>',
                      '<a href="', '%%WWWROOT%%/course/mod.php', CHAR(63), 'sesskey=',
                      '%7Bsesskey%7D',
                      CHAR(38), 'de', 'lete=', x.cmid,
                      '" target="_blank" class="text-muted ms-2" title="Remove activity">',
                      '<i class="fa fa-trash"></i>',
                      '</a>'
                  )
                  ELSE CONCAT(
                      '<a href="', '%%WWWROOT%%/course/mod.php', CHAR(63), 'sesskey=',
                      '%7Bsesskey%7D',
                      CHAR(38), 'de', 'lete=', x.cmid,
                      '" target="_blank" class="text-muted ms-2" title="Remove activity">',
                      '<i class="fa fa-trash"></i>',
                      '</a>'
                  )
              END,
              '<br><small class="text-muted"><b>Identified because</b> ',
                  CASE
                      WHEN x.is_publisher = 1
                          THEN 'Source URL looks like a publisher or platform'
                      WHEN x.has_doi_path = 1
                          THEN 'Filename looks like it contains a DOI'
                      WHEN x.has_doi_word = 1
                          THEN 'Filename contains doi'
                      WHEN x.has_etal = 1
                          THEN 'Filename contains et al.'
                      WHEN x.has_harvard_authors_bracket_year = 1
                          THEN 'Filename looks like a Harvard-style reference with authors, bracketed year and title'
                      WHEN x.has_harvard_authors_plain_year = 1
                          THEN 'Filename looks like a Harvard-style reference with authors, year and title'
                      WHEN x.has_year_brackets = 1
                          THEN 'Filename contains a year in brackets'
                      WHEN x.has_hyphen_year = 1
                          THEN 'Filename contains a year with hyphens'
                      ELSE 'Matched copyright heuristic'
                  END,
              '</small>',
            '</div>'
        ) AS rowhtml
    FROM (
        SELECT
            cm.id AS cmid,
            CASE
                WHEN cm.visible = 1 AND cs.visible = 1 THEN 1
                ELSE 0
            END AS studentvisible,
            f.contextid,
            f.component,
            f.filearea,
            f.itemid,
            f.filepath,
            f.filename,
            CASE
                WHEN LOWER(f.source) REGEXP '(jstor|sciencedirect|wiley|tandfonline|sagepub|springer|nature\\.com|academic\\.oup|cambridge\\.org|ebscohost|proquest|elsevier|cell\\.com|ieee|acm\\.org)'
                    THEN 1
                ELSE 0
            END AS is_publisher,
            CASE
                WHEN LOWER(f.filename) REGEXP '(^|[^0-9])[0-9]{2}\\.[0-9]{4,}/'
                    THEN 1
                ELSE 0
            END AS has_doi_path,
            CASE
                WHEN LOWER(f.filename) REGEXP '(^|[^a-z])doi([^a-z]|$)'
                    THEN 1
                ELSE 0
            END AS has_doi_word,
            CASE
                WHEN LOWER(f.filename) REGEXP 'et[ ]+al\\.'
                    THEN 1
                ELSE 0
            END AS has_etal,
            CASE
                WHEN LOWER(f.filename) REGEXP '\\((19[0-9]{2}|20[0-9]{2})\\)'
                    THEN 1
                ELSE 0
            END AS has_year_brackets,
            CASE
                WHEN LOWER(f.filename) REGEXP '^[^0-9_.,()\\[\\]-]{2,}([ _.,-]+[^0-9_.,()\\[\\]-]{2,}){1,7}[ _.,-]*(19[0-9]{2}|20[0-9]{2})[ _.,-]+[^0-9]{3,}'
                    THEN 1
                ELSE 0
            END AS has_harvard_authors_plain_year,
            CASE
                WHEN LOWER(f.filename) REGEXP '^[^0-9_.,()\\[\\]-]{2,}([ _.,-]+[^0-9_.,()\\[\\]-]{2,}){1,7}[ _.,-]*\\((19[0-9]{2}|20[0-9]{2})\\)[ _.,-]+[^0-9]{3,}'
                    THEN 1
                ELSE 0
            END AS has_harvard_authors_bracket_year,
            CASE
                WHEN LOWER(f.filename) REGEXP '-[ ]*(19[0-9]{2}|20[0-9]{2})[ ]*-'
                    THEN 1
                ELSE 0
            END AS has_hyphen_year
        FROM {course_modules} cm
        JOIN {course_sections} cs ON cs.id = cm.section
        JOIN {context} ctx ON ctx.contextlevel = 70 AND ctx.instanceid = cm.id
        JOIN {files} f ON f.contextid = ctx.id
        WHERE cm.course = %%COURSEID%%
          AND cm.deletioninprogress = 0
          AND f.filename <> '.'
          AND f.filesize > 0
          AND (
                f.mimetype = 'application/pdf'
                OR LOWER(f.filename) LIKE '%.pdf'
                OR f.mimetype = 'application/msword'
                OR f.mimetype = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
                OR LOWER(f.filename) LIKE '%.doc'
                OR LOWER(f.filename) LIKE '%.docx'
              )
          AND f.component IN ('mod_resource','mod_page','mod_book','mod_folder','mod_label')
          AND f.filearea IN ('content','chapter','intro')
    ) x
    WHERE
        x.is_publisher = 1
        OR x.has_doi_path = 1
        OR x.has_doi_word = 1
        OR x.has_etal = 1
        OR x.has_harvard_authors_bracket_year = 1
        OR x.has_harvard_authors_plain_year = 1
        OR x.has_year_brackets = 1
        OR x.has_hyphen_year = 1
) q
WHERE q.studentvisible = 1

UNION ALL

SELECT
    CONCAT(
        '<div class="alert alert-success" role="alert">',
        'Congratulations! This check has not identified any resources that risk being copyrighted. If you have hidden at-risk files, speak to your ',
        '<a target="_blank" href="https://uelac.sharepoint.com/sites/libraryandlearningservices/SitePages/Support-by-subject.aspx">subject librarian</a>',
        ' about how to make direct links to the legitimate source.',
        '</div>'
    ) AS Result
WHERE NOT EXISTS (
    SELECT 1
    FROM (
        SELECT
            CASE
                WHEN cm.visible = 1 AND cs.visible = 1 THEN 1
                ELSE 0
            END AS studentvisible,
            CASE
                WHEN LOWER(f.source) REGEXP '(jstor|sciencedirect|wiley|tandfonline|sagepub|springer|nature\\.com|academic\\.oup|cambridge\\.org|ebscohost|proquest|elsevier|cell\\.com|ieee|acm\\.org)'
                    THEN 1
                ELSE 0
            END AS is_publisher,
            CASE
                WHEN LOWER(f.filename) REGEXP '(^|[^0-9])[0-9]{2}\\.[0-9]{4,}/'
                    THEN 1
                ELSE 0
            END AS has_doi_path,
            CASE
                WHEN LOWER(f.filename) REGEXP '(^|[^a-z])doi([^a-z]|$)'
                    THEN 1
                ELSE 0
            END AS has_doi_word,
            CASE
                WHEN LOWER(f.filename) REGEXP 'et[ ]+al\\.'
                    THEN 1
                ELSE 0
            END AS has_etal,
            CASE
                WHEN LOWER(f.filename) REGEXP '\\((19[0-9]{2}|20[0-9]{2})\\)'
                    THEN 1
                ELSE 0
            END AS has_year_brackets,
            CASE
                WHEN LOWER(f.filename) REGEXP '^[^0-9_.,()\\[\\]-]{2,}([ _.,-]+[^0-9_.,()\\[\\]-]{2,}){1,7}[ _.,-]*(19[0-9]{2}|20[0-9]{2})[ _.,-]+[^0-9]{3,}'
                    THEN 1
                ELSE 0
            END AS has_harvard_authors_plain_year,
            CASE
                WHEN LOWER(f.filename) REGEXP '^[^0-9_.,()\\[\\]-]{2,}([ _.,-]+[^0-9_.,()\\[\\]-]{2,}){1,7}[ _.,-]*\\((19[0-9]{2}|20[0-9]{2})\\)[ _.,-]+[^0-9]{3,}'
                    THEN 1
                ELSE 0
            END AS has_harvard_authors_bracket_year,
            CASE
                WHEN LOWER(f.filename) REGEXP '-[ ]*(19[0-9]{2}|20[0-9]{2})[ ]*-'
                    THEN 1
                ELSE 0
            END AS has_hyphen_year
        FROM {course_modules} cm
        JOIN {course_sections} cs ON cs.id = cm.section
        JOIN {context} ctx ON ctx.contextlevel = 70 AND ctx.instanceid = cm.id
        JOIN {files} f ON f.contextid = ctx.id
        WHERE cm.course = %%COURSEID%%
          AND cm.deletioninprogress = 0
          AND f.filename <> '.'
          AND f.filesize > 0
          AND (
                f.mimetype = 'application/pdf'
                OR LOWER(f.filename) LIKE '%.pdf'
                OR f.mimetype = 'application/msword'
                OR f.mimetype = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
                OR LOWER(f.filename) LIKE '%.doc'
                OR LOWER(f.filename) LIKE '%.docx'
              )
          AND f.component IN ('mod_resource','mod_page','mod_book','mod_folder','mod_label')
          AND f.filearea IN ('content','chapter','intro')
    ) v
    WHERE v.studentvisible = 1
      AND (
            v.is_publisher = 1
            OR v.has_doi_path = 1
            OR v.has_doi_word = 1
            OR v.has_etal = 1
            OR v.has_harvard_authors_bracket_year = 1
            OR v.has_harvard_authors_plain_year = 1
            OR v.has_year_brackets = 1
            OR v.has_hyphen_year = 1
          )
)

UNION ALL

SELECT
    q2.rowhtml AS Result
FROM (
    SELECT
        x.studentvisible,
        CONCAT(
            '<div class="alert alert-secondary" style="border:1px solid #d6d8db">',
              '<b>Hidden from students</b><br>',
              '<a href="', '%%WWWROOT%%',
              '/pluginfile.php/', x.contextid, '/', x.component, '/', x.filearea, '/',
              x.itemid, x.filepath, x.filename,
              '" target="_blank">',
              x.filename,
              '</a> ',
              '<a href="', '%%WWWROOT%%/course/mod.php', CHAR(63), 'sesskey=',
              '%7Bsesskey%7D',
              CHAR(38), 'de', 'lete=', x.cmid,
              '" target="_blank" class="text-muted ms-2" title="Remove activity">',
              '<i class="fa fa-trash"></i>',
              '</a>',
              '<br><small class="text-muted"><b>Identified because</b> ',
                  CASE
                      WHEN x.is_publisher = 1
                          THEN 'Source URL looks like a publisher or platform'
                      WHEN x.has_doi_path = 1
                          THEN 'Filename looks like it contains a DOI'
                      WHEN x.has_doi_word = 1
                          THEN 'Filename contains doi'
                      WHEN x.has_etal = 1
                          THEN 'Filename contains et al.'
                      WHEN x.has_harvard_authors_bracket_year = 1
                          THEN 'Filename looks like a Harvard-style reference with authors, bracketed year and title'
                      WHEN x.has_harvard_authors_plain_year = 1
                          THEN 'Filename looks like a Harvard-style reference with authors, year and title'
                      WHEN x.has_year_brackets = 1
                          THEN 'Filename contains a year in brackets'
                      WHEN x.has_hyphen_year = 1
                          THEN 'Filename contains a year with hyphens'
                      ELSE 'Matched copyright heuristic'
                  END,
              '</small>',
            '</div>'
        ) AS rowhtml
    FROM (
        SELECT
            cm.id AS cmid,
            CASE
                WHEN cm.visible = 1 AND cs.visible = 1 THEN 1
                ELSE 0
            END AS studentvisible,
            f.contextid,
            f.component,
            f.filearea,
            f.itemid,
            f.filepath,
            f.filename,
            CASE
                WHEN LOWER(f.source) REGEXP '(jstor|sciencedirect|wiley|tandfonline|sagepub|springer|nature\\.com|academic\\.oup|cambridge\\.org|ebscohost|proquest|elsevier|cell\\.com|ieee|acm\\.org)'
                    THEN 1
                ELSE 0
            END AS is_publisher,
            CASE
                WHEN LOWER(f.filename) REGEXP '(^|[^0-9])[0-9]{2}\\.[0-9]{4,}/'
                    THEN 1
                ELSE 0
            END AS has_doi_path,
            CASE
                WHEN LOWER(f.filename) REGEXP '(^|[^a-z])doi([^a-z]|$)'
                    THEN 1
                ELSE 0
            END AS has_doi_word,
            CASE
                WHEN LOWER(f.filename) REGEXP 'et[ ]+al\\.'
                    THEN 1
                ELSE 0
            END AS has_etal,
            CASE
                WHEN LOWER(f.filename) REGEXP '\\((19[0-9]{2}|20[0-9]{2})\\)'
                    THEN 1
                ELSE 0
            END AS has_year_brackets,
            CASE
                WHEN LOWER(f.filename) REGEXP '^[^0-9_.,()\\[\\]-]{2,}([ _.,-]+[^0-9_.,()\\[\\]-]{2,}){1,7}[ _.,-]*(19[0-9]{2}|20[0-9]{2})[ _.,-]+[^0-9]{3,}'
                    THEN 1
                ELSE 0
            END AS has_harvard_authors_plain_year,
            CASE
                WHEN LOWER(f.filename) REGEXP '^[^0-9_.,()\\[\\]-]{2,}([ _.,-]+[^0-9_.,()\\[\\]-]{2,}){1,7}[ _.,-]*\\((19[0-9]{2}|20[0-9]{2})\\)[ _.,-]+[^0-9]{3,}'
                    THEN 1
                ELSE 0
            END AS has_harvard_authors_bracket_year,
            CASE
                WHEN LOWER(f.filename) REGEXP '-[ ]*(19[0-9]{2}|20[0-9]{2})[ ]*-'
                    THEN 1
                ELSE 0
            END AS has_hyphen_year
        FROM {course_modules} cm
        JOIN {course_sections} cs ON cs.id = cm.section
        JOIN {context} ctx ON ctx.contextlevel = 70 AND ctx.instanceid = cm.id
        JOIN {files} f ON f.contextid = ctx.id
        WHERE cm.course = %%COURSEID%%
          AND cm.deletioninprogress = 0
          AND f.filename <> '.'
          AND f.filesize > 0
          AND (
                f.mimetype = 'application/pdf'
                OR LOWER(f.filename) LIKE '%.pdf'
                OR f.mimetype = 'application/msword'
                OR f.mimetype = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
                OR LOWER(f.filename) LIKE '%.doc'
                OR LOWER(f.filename) LIKE '%.docx'
              )
          AND f.component IN ('mod_resource','mod_page','mod_book','mod_folder','mod_label')
          AND f.filearea IN ('content','chapter','intro')
    ) x
    WHERE x.studentvisible = 0
      AND (
            x.is_publisher = 1
            OR x.has_doi_path = 1
            OR x.has_doi_word = 1
            OR x.has_etal = 1
            OR x.has_harvard_authors_bracket_year = 1
            OR x.has_harvard_authors_plain_year = 1
            OR x.has_year_brackets = 1
            OR x.has_hyphen_year = 1
          )
) q2
```

## Template Header

```
<div class="card shadow-sm mb-3">
  <div class="card-header bg-light">
    <h3 class="h6 mb-1">Potential Copyright-Risk Documents</h3>
    <p class="text-muted small mb-0">This report lists PDF and Word files in
      this course that match copyright-risk heuristics, such as DOI patterns,
      publisher source URLs, citation-like filenames, or year markers. Use the
      link to open each file directly - or you can instantly hide the activity
      by clicking on the '<i class="fa fa-eye-slash"></i>' icon. <a
        href="https://uelac.sharepoint.com/sites/centreforexcellenceinlearningandteaching591/SitePages/08-No-copyrighted-files.aspx"
        target="_blank" rel="noopener">Click here to view the guide for this
        report</a>.</p>
  </div>
  <div class="card-body p-0"><!-- Header row -->
    <div class="d-flex fw-bold border-bottom px-3 py-2 bg-light">
      <div class="flex-grow-1">File</div>
      <div class="text-center" style="width: 260px;"> </div>
    </div>
  </div>
</div>
```

## Template Record

```
<p>[[Result]]</p>
```
