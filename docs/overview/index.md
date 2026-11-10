# Overview


<div class="video-embed">
<iframe src="https://www.youtube-nocookie.com/embed/jwwF-3HW9dE" title="Moodle Minimum Standards overview video" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
</div>


The Moodle Minimum Standards widget has been designed by CELT to help academic staff meet the required minimum standards expected of all Moodle course pages. The widget runs an automated check against each standard and presents a progress report within the Moodle course page, indicating both completed and outstanding requirements.

## Background

The widget aims to support the following:

### Easier tracking and auditing

The Moodle Minimum Standards are a requirement that the University must report on regularly. These reports require accurate data on how many standards are met and across how many Moodle pages. Previously, this process relied on manual checks of individual modules. With nearly 6,000 Moodle module pages generated annually at UEL, manual auditing is not sustainable. A key objective of the widget is therefore to enable automated reporting against quantifiable criteria.

### Improved consistency

The Moodle Minimum Standards represent baseline expectations and are intentionally not demanding. Their broad definitions, however, allow for varied interpretation. Manual reviews can therefore result in inconsistent judgements. Automated criteria reduce subjectivity and improve consistency when evaluating whether standards are met across different module pages.

### Improved transparency

A frequent source of frustration for staff is knowing that requirements exist without clearly understanding what actions are needed to meet them. The widget makes expectations explicit and provides clear guidance on outstanding standards.

### Improved discoverability

Guidance on Moodle Minimum Standards has traditionally existed outside Moodle itself, for example on SharePoint or YouTube. This separation makes information less accessible and less relevant to individual module pages. By embedding guidance directly within Moodle, the widget provides targeted support. For example, if a course meets all standards except active learning requirements, the widget highlights that specific gap and directs users accordingly.

### Increased compliance

Improved discoverability and transparency are intended to increase overall compliance with the Minimum Standards. Visual indicators within the progress bar highlight unmet standards, encouraging completion through clear feedback and light gamification.

## How does the widget work?

The widget is built using an existing Moodle tool called Configurable Reports, which enables custom reporting through SQL-based queries. Moodle enforces strict security constraints on SQL usage to protect data integrity. The widget’s user interface leverages Moodle’s customisation features, using custom CSS and HTML within reports to improve clarity and usability.

The widget contains three main components:






### 1. The progress bar



![](/assets/gitbook/image.png)


The progress bar is a customisable report that has been heavily modified using CSS and html to resemble a dashboard interface. This report is then embedded inside a text area on the Moodle page using an iframe. This means that the report always exists in Configurable Reports, and not in the Moodle course itself. However, the report uses %%COURSEID%% so that it always relates to the course it currently sits in. The progress bar report runs its own independent check of each of the minimum standards, and then creates the percentage values of pass / fail against the number of checks made. This means that if any changes are made to the check criteria or the summary report or the detailed report, those same changes need to be made to the progress bar, otherwise the percentage values may be inaccurate.

Some of the minimum standards assume that students are submitting their summative assessment via Moodle. However, this is not always the case. If a specific module is not using Moodle for its assessment, instructors can use the course settings to indicate this. Those minimum standards will then show in the progress bar as a grey 'n/a' and will not be counted as a fail. The progress bar functions as a hyperlink to the summary report, and also includes a button that takes users to that same summary report.






### 2. The summary report



![](/assets/gitbook/image-1.png)


The summary report is not an embedded iframe, but is a full report in Configurable Report that users are directed to after clicking on the progress bar. As such, again the report does not exist inside the individual module page, but uses %%COURSEID%% to pick up the course ID from the progress bar that refers to it.

In order to make the configurable report window more user-friendly and visually appealing to users, site-wide custom CSS has been applied to remove some elements (i.e. the report run-time), refine some others (i.e. changing the bootstrap alert text from black to white), and add others (i.e. table borders).

The summary report runs the same checks as the progress bar, using the same criteria to check which of the minimum standards have been met and which have not. The summary then provides a list of each report, together with a status for each one. These statuses are:

* **Pass:** If the criteria for the minimum standards have been met
* **Fail:** If the criteria for the minimum standards have not been met
* **n/a:** If the criteria for the minimum standard are not relevant to the module

The title of each minimum standard functions as a hyperlink to the detailed report for that minimum standard.






### 3. The detailed report



![](/assets/gitbook/image-2.png)


Like the summary report, the detailed report exists in Configurable Reports. The link from the summary report takes the user to the specific report for that minimum standard, again using %%COURSEID%% to make the report specific to the referring course page. The detailed report makes explicit the criteria used to evaluate the status of the minimum standard. If a standard has failed (i.e. some sections are empty), then the reasons for that failure are clearly listed (i.e. the empty sections are listed) and where possible direct links are given for users to easily correct the issues (i.e. direct links to hide or delete the empty section).

Detailed reports make significant use of html and CSS to generate colour codes, explanatory banners and icons in order to make the report as easy as possible for users to understand and act on. Where editing links need a session key to function, this is achieved using the FiterCode %7Bsesskey%7D is used.





## Challenges

Developing the widget to its current state has involved several challenges, the most significant of which are outlined below.

### Lack of developer expertise

While Moodle supports custom tools, development typically requires specialist knowledge of Moodle architecture and SQL. Much of the widget’s development has been enabled through the use of generative AI, combined with extensive testing and refinement. For example, it was discovered that the secure environment of Moodle means that certain symbols and words cannot be used – therefore is necessary to split colon-word sequences (i.e. CONCAT('[','space:](https://uelac.sharepoint.com/sites/centreforexcellenceinlearningandteaching591/SitePages)')) and use character codes to replace some symbols (i.e. CHAR(58) instead of semi-colons).

### Complex criteria

Defining automated criteria for qualitative standards presents ongoing challenges. For example, determining whether an activity name is “meaningful” requires iterative testing and refinement. This process is expected to continue as the widget is used more extensively.

## Risks

There are four primary risks associated with the widget:

### Changing standards

The current Minimum Standards are largely quantifiable. However, future revisions may introduce more qualitative elements, making automated evaluation more difficult.

### Plugin support

The widget relies on two third-party Moodle plugins: Configurable Reports and FilterCodes. Both are widely used and well supported, but if either becomes unavailable, the widget may no longer be maintainable.

### Moodle support

Although developed within CELT, the widget requires specialist Moodle expertise beyond the standard remit of Learning Technology Advisors. The absence of dedicated Moodle developer support presents a sustainability risk.

### Moodle load

Current testing suggests minimal impact on Moodle performance, as reports are generated only when accessed by users. However, system-wide impact at full institutional scale has not yet been tested.

## Responsibility

The widget has been developed within CELT and is maintained by Jonathan Tulloch. All enquiries should be directed to j.tulloch@uel.ac.uk.
