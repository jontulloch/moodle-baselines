# Setup

## Important Information

This system uses Configurable Reports to create an automated auditing system for Moodle minimum or baseline standards.  It is not intended as a 'final' solution.  The aim is to use this system to test the concept, using a format that can be easily adjusted without the need for any complex IT backend development.

The Configurable Reports block can be accessed and used by any user with Admin permissions.  And because of how the Configurable Reports block works, it is able to draw on and cross-reference any data table from within Moodle - without the limitations of Ad Hoc Reports.

It is important to note that the codes included on this site have been developed within UEL, over a considerable time, and with the specific intention of evaluating the criteria of UEL's own 'Moodle Minimum Standards'.  We cannot develop code to evaluate other conditions, and are simply making this available in case it is useful for others to see how such a system might work - with a view to them developing their own.  I strongly advise that these same codes are NOT implemented unilaterally on a different Moodle site, but are instead used for reference and development.  I really have no idea what chaos might ensue if you tried!  One option might be to paste the SQL into an AI system like Claude, and ask it guide you on making any adjustments you might need.



## Requirements

For this system to work, it requires two widely-used and well-established plugins:



* Configurable Reports:  This is the system that can examine all the data tables in Moodle
* FilterCodes:  This is the system that enables certain shortcuts relating to 'current course'



## Configurable Reports

Configurable Reports appears as a block that can be added on Dashboards or homepages, and is obly visible to users with Admin access.  When it is added you will see a link to 'Manage Reports':


![](/assets/gitbook/fe9a5ada-66c8-4643-9de1-5e9751b60f2e.png)




This will open a new page where you see the options to 'Add report' or 'Import report' by gradding an xls file into the drag and drop area:


![](/assets/gitbook/8a436070-534c-4db4-aae4-00d1d512b694.png)




For the reports to work across all course pages on the Moodle site, it is important to enable the options for 'Global report' and 'Javascript ordering':


![](/assets/gitbook/270a6349-e50a-4cdf-9122-d354cd2ba25f.png)




In the report pages itself, there are two main pages that need to be adjusted.  The first is the 'Custom SQL' page, where the SQL code can be pasted or developed.  The second is the 'Template', which determines what data from the SQL is displayed in the report.  Both the SQL and the Template code are needed for the reports to work as intended.


![](/assets/gitbook/7c1c23f4-8fab-4da4-8241-f2a548034708.png)




## Course Page Report

The system revolves around a single report that is placed as an html activity on a course page:


![](/assets/gitbook/image-120.png)




To add this, simply add a Text and Media Area, or edit the description of any section, and toggle the editor into html mode.  Then paste the html below:

```
<p>{ifminteacher}</p>
<div class="card shadow-sm mb-3" style="border-radius: 10px; overflow: hidden;">
  <div class="card-body text-center">
    <h5 class="card-title mb-3" style="font-weight: 600;">Moodle Minimum
      Standards Summary</h5>
    <div class="mms-gauge-frame"><iframe id="mmsGauge"
        src="{wwwroot}/blocks/configurable_reports/viewreport.php?id=111&amp;courseid={courseid}&amp;embed=1"
        scrolling="no">
      </iframe></div>
    <div class="mt-2"><a class="btn btn-primary btn-sm"
        style="border-radius: 4px;"
        href="{wwwroot}/blocks/configurable_reports/viewreport.php?id=97&amp;courseid={courseid}"
        target="_blank" rel="noopener"> View Full Report </a></div>
  </div>
</div>
<p>{/ifminteacher}</p>
```



This html uses FilterCodes to ensure that it is visible only to users with teacher \[ifminteacher], or higher access.   It then embeds the configurable report for the 'Progress Bar' (with some styling additions to make the progress bar appear properly), with the 'courseid' set to the course ID of the current page.



The embedded Configurable Report then acts as a hyperlink to open another Configurable Report - the 'Summary Report'.  Again,  the hyperlink sets the courseid to match the id of the current page:


![](/assets/gitbook/31f05b76-145f-48a9-9b9f-b4017b96f5c6.png)




This same pattern is then repeated for all the other reports: Each line acts as a hyperlink to the more detailed Configurable Report for each test, with the link using the {courseid} code to ensure that the report relates specifically to the current page.
