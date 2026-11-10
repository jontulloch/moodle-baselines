# The Progress Bar

The progress bar appears like this at the top of the course page.


![The progress bar](/assets/gitbook/image-9.png)


The progress bar can be added to any course page. You can request the widget to be added to your pages using the form at the bottom of this page. There is currently no plan to make this widget a part of the template applied to all module pages, but this may happen after the tool has been properly tested.

## Appearance

The progress bar is an embedded frame that appears at the top of your course page. It is set up so that students cannot see it, but instructors can. Unlike similar activities, you will not see a small symbol saying ‘hidden from students’. This is deliberate, just to make the appearance of the progress bar a little less cluttered. A small code is inserted into the progress bar meaning that you have to have at least instructor access to be able to view it, meaning that the ‘hidden’ symbol isn’t needed.


![The html to insert the block](/assets/gitbook/image-4.png)


The progress bar can sit in either a text activity, or a block – so it can be moved pretty much anywhere you would like on your course page, even into the blocks drawer. This can be handy if you just don’t like it sitting right in front of you every time you open the course page.


![The widget can be moved into the blocks drawer.](/assets/gitbook/image-5.png)




## What it does

The bar itself represents the percentage of minimum standards that are met, are not met, or are not applicable to the course page. Standards that are met show up in green. Those that are not met show in red, and those that are not applicable show as grey. There is more information about the ‘not applicable’ label below.

The percentages are calculated against the number of standards. There are currently 11 minimum standards, so if 5 of those standards are met, then 45% of the progress bar will show as green. If 4 of the standards are not met, then 36% of the progress bar will show as red.


![Progress bar showing green pass and red fail](/assets/gitbook/image-6.png)


This suggests that 8 of the 11 mimimum standards have been met.

There is one minimum standards that assumes students are submitting their assessments via Moodle. This is the standard **Are summative assessment links available, with completion criteria?** For some modules, this may not be relevant, because the assessment is being conducted through a practical assessment, an exam, work-based learning or some other method.

This can be indicated using the Minimum Standards settings in the course settings. This setting means that you can indicate if students are not submitting via Moodle for your module. Not only does this setting help with Moodle Minimum Standards, but can also help with the effective support of modules in relation to online assessment more widely.


![Selecting the submission type from the course settings](/assets/gitbook/image-7.png)


When this setting is changed from Moodle, the minimum standard about summative assessment links being available automatically changes to ‘not applicable’, and will show up as grey on the progress bar.


![Progress bar with n/a for non Moodle submissions](/assets/gitbook/image-9.png)


## How to use it

The progress bar will automatically update when you make changes to your course page, but this update is dependent on the web page ‘refreshing’. Most of the time, your Moodle page will refresh every time you make a change. If you were to ‘hide’ your empty sections, each time you do so the web page will refresh, and the progress bar will update.

The progress bar itself provides just a visual overview of the minimum standards. To see more details about each of the standards, you can either click on the button for the ‘detailed report’, or just click anywhere on the report itself. This will open up the detailed report in a new window.
