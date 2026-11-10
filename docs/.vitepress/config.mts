import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'en-GB',
  title: 'Moodle Baselines',
  description: 'Guides and reference material for Moodle baselines.',
  base: '/moodle-baselines/',
  themeConfig: {
    nav: [
      { text: 'Documentation', link: '/' },
      { text: 'GitHub', link: 'https://github.com/jontulloch/moodle-baselines' }
    ],
    sidebar: [
      {
        "text": "Setup",
        "link": "/"
      },
      {
        "text": "Overview",
        "link": "/overview/",
        "items": [
          {
            "text": "The Progress Bar",
            "link": "/overview/the-progress-bar/",
            "items": [
              {
                "text": "SQL: Progress Bar",
                "link": "/overview/the-progress-bar/sql-progress-bar"
              }
            ],
            "collapsed": true
          },
          {
            "text": "The Summary Report",
            "link": "/overview/the-summary-report/",
            "items": [
              {
                "text": "SQL: Summary Report",
                "link": "/overview/the-summary-report/sql-summary-report"
              }
            ],
            "collapsed": true
          },
          {
            "text": "01 Module Guide Available",
            "link": "/overview/01-module-guide-available/",
            "items": [
              {
                "text": "SQL: Module Guide",
                "link": "/overview/01-module-guide-available/sql-module-guide"
              }
            ],
            "collapsed": true
          },
          {
            "text": "02 Contact information",
            "link": "/overview/02-contact-information/",
            "items": [
              {
                "text": "SQL: Contact Information",
                "link": "/overview/02-contact-information/sql-contact-information"
              }
            ],
            "collapsed": true
          },
          {
            "text": "03 Profile Picture",
            "link": "/overview/03-profile-picture/",
            "items": [
              {
                "text": "SQL: Profile Picture",
                "link": "/overview/03-profile-picture/sql-profile-picture"
              }
            ],
            "collapsed": true
          },
          {
            "text": "04 Empty sections",
            "link": "/overview/04-empty-sections/",
            "items": [
              {
                "text": "SQL: Empty Sections",
                "link": "/overview/04-empty-sections/sql-empty-sections"
              }
            ],
            "collapsed": true
          },
          {
            "text": "05 Sections are Named",
            "link": "/overview/05-sections-are-named/",
            "items": [
              {
                "text": "SQL: Sections Named",
                "link": "/overview/05-sections-are-named/sql-sections-named"
              }
            ],
            "collapsed": true
          },
          {
            "text": "06 Activities are meaningfully named",
            "link": "/overview/06-activities-are-meaningfully-named/",
            "items": [
              {
                "text": "SQL: Activities Meaningfully Named",
                "link": "/overview/06-activities-are-meaningfully-named/sql-activities-meaningfully-named"
              }
            ],
            "collapsed": true
          },
          {
            "text": "07 Specific careers information",
            "link": "/overview/07-specific-careers-information/",
            "items": [
              {
                "text": "SQL: Careers Information",
                "link": "/overview/07-specific-careers-information/sql-careers-information"
              }
            ],
            "collapsed": true
          },
          {
            "text": "08 No copyrighted files",
            "link": "/overview/08-no-copyrighted-files/",
            "items": [
              {
                "text": "SQL: Copyright",
                "link": "/overview/08-no-copyrighted-files/sql-copyright"
              }
            ],
            "collapsed": true
          },
          {
            "text": "09 Summative Links with Completion Criteria",
            "link": "/overview/09-summative-links-with-completion-criteria/",
            "items": [
              {
                "text": "SQL: Summative Links",
                "link": "/overview/09-summative-links-with-completion-criteria/sql-summative-links"
              }
            ],
            "collapsed": true
          },
          {
            "text": "10 Due dates are visible on course page",
            "link": "/overview/10-due-dates-are-visible-on-course-page/",
            "items": [
              {
                "text": "SQL: Due Dates",
                "link": "/overview/10-due-dates-are-visible-on-course-page/sql-due-dates"
              }
            ],
            "collapsed": true
          },
          {
            "text": "11 At least one active learning activity",
            "link": "/overview/11-at-least-one-active-learning-activity/",
            "items": [
              {
                "text": "SQL: Active Learning",
                "link": "/overview/11-at-least-one-active-learning-activity/sql-active-learning"
              }
            ],
            "collapsed": true
          }
        ],
        "collapsed": false
      }
    ],
    search: { provider: 'local' },
    outline: { label: 'On this page', level: [2, 3] },
    editLink: {
      pattern: 'https://github.com/jontulloch/moodle-baselines/edit/main/docs/:path',
      text: 'Edit this page on GitHub'
    },
    docFooter: { prev: 'Previous page', next: 'Next page' }
  }
})
