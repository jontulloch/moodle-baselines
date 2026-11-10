# 06 Activities are meaningfully named

For an activity name to be meaningful, it needs to make sense to students. It is often worth thinking that the name of any activity should give students enough information for them to understand what the resource is, and (ideally) what they need to do with it. This report scans the text of all activities and resources on the course page looking for any that match specific criteria for being overly generic, or coded - working on the basis that these types of names are less likely to be ‘meaningful’ according to the above definition.

### Appearance

The top of the detailed report table explains the criteria through which the pass / fail result has been achieved on the summary report and the in the progress bar. Below that explanation, there is a single list of all activities on the course page which have been identified:


![](/assets/gitbook/image-49.png)


Activities that have been identified as having a potentially problematic name, are listed and highlighted in yellow. You will see the name of the activity itself, and underneath an explanation of the reason why the activity has been identified. For example, if the name appears to be ‘generic’ or an auto-generated name from a download. The activity name will have an edit icon next to it, which will take you directly to the activity settings where you can rename it.

### What it does

This report searches through the course page and identifies all of the activities and resources. It then looks at the names of these activities and resources and checks for pre-determined patterns that might indicate if the file name is likely to confuse students. There are a number of reasons why files can end up being on your Moodle course page with problematic names. For example:

> A file created in PowerPoint or Word might default to a generic name like ‘PowerPoint.ppt’ or ‘Document.docx’. These names tell students nothing about what is in the file, or how it relates to their studies - but sometimes we can forget to change the name to something more meaningful before we upload them.

> A file might have a code name that has been automatically given to it when it was created. This can often happen with files that have been downloaded or created by software - for example ‘69b2e12915a27a6072d69e48.pdf’ or ‘Screenshot 2026-03-11 145715.jpg’.

> Sometimes we name files according to conventions that reflect our own years of experience and can therefore include coded information that makes perfect sense to us but may be difficult for students to interpret. For example ‘MG\_EG4001\_2324\_RW.doc’. This might be a code that signals the file is the '**module guide** for the module **EG4001** in the academic year **2324** as taught by **Raymond Williams**. But students may struggle to interpret this code.

This report will attempt to identify any files or resources that exhibits these kinds of issues, and list those activities. It distinguishes between the ‘file name’ and the ‘activity name’ of a resource. For example, if I upload a file with the name ‘document.docx’ then by default the activity will take its name from the filename:


![](/assets/gitbook/image-50.png)


This activity will therefore be identified by the report as having a very generic name:


![](/assets/gitbook/image-51.png)


If I go into the settings for that resource, I can change the name of the activity:


![](/assets/gitbook/image-52.png)


The ‘filename’ remains ‘document.docx’ - but because the activity name has been changed, it will no longer be picked up by the report as having a generic name.


::: info

It should be noted that of all the minimum standards, this is perhaps the most difficult to automate. What is ‘meaningful’ is often dependent on context, and what is ‘meaningless’ is infinitely variable. As such, this report is unlikely to be able to identify every problematic activity name. Similarly, you may find that it has identified an activity where the name of an activity has a specifically meaningful name.

:::


To deal with such eventualities, the report is set up to ignore any activity that has additional information in the ‘description’ field. Every activity or resource in Moodle can have a description added to it, which is useful in providing additional information to students about the resource and what they need to do with it. If any text is added into this description field, the report will ignore the activity even if the activity name does not meet the conditions for being ‘meaningful’.

### How to use it

In order to meet the criteria for the minimum standard, the report needs to have no activities highlighted in yellow. If there are no files with problematic names in the course page, a green message will appear telling you that no issues have been found:


![](/assets/gitbook/image-53.png)


If issues are identified on the course page, they will be listed in the report. Underneath each identified file or resource you will see a short explanation of the reasons why it has been identified.


![](/assets/gitbook/image-54.png)


Each file or activity will have an edit icon next to it. You can click on this edit link to go directly to the settings for the file or activity, where you can change the name:


![](/assets/gitbook/image-55.png)


Sometimes, the report may highlight an issue that has specific context meaning that the name has to remain as it is. For example:

> _\*z]Kw%oG4UUS0/@-ejc(:'8dc_

This name may appear meaningless and so it has been highlighted, but it is actually a line of computer code - and in specific contexts it might be necessary for this name to remain as it is. In these circumstances, you can resolve the issue by adding additional information in the description field. To do this, click on the editing link next to the activity, and type additional information into the ‘Description’ field:


![](/assets/gitbook/image-56.png)


There is an option to show this description on the course page - which is recommended if it makes the purposes of the file clearer to students. Save and return and the file will no longer be listed in the report:


![](/assets/gitbook/image-57.png)

