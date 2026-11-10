# 02 Contact information

The **02 contact information** report lists all those on the module with an Instructor or Primary Instructor role, and then displays whether the contact information for that user is visible on the course page.

## Appearance

The top of the detailed report table explains the criteria through which the pass / fail result has been achieved on the summary report and the in the progress bar. Below that explanation, there are two columns: One titled ‘Name and role’ and the other ‘Contact Info Visible’.


![](/assets/gitbook/image-20.png)


In the ‘Name and role’ column, we can see the name of all the instructors on the module, and their specific role (Instructor / Primary Instructor). In the ‘Contact Info Visible’ column, a green tick is given if the contact information for that member of staff is visible on the course page.

## What it does

This report uses two pieces of information: The participants list, and the Course Contacts block. The report searches the participants list and identifies everyone with the role ‘Instructor' or ‘Primary Instructor’. These are then listed in the report. Normally, the module leader will be the ‘Primary Instructor’, and the report requires there to be a primary instructor for the conditions to be met. If there is no primary instructor on the course page, then the report will show a banner saying ‘There appears to be no Primary Instructor assigned to this course. Please contact systemcourse@uel.ac.uk to add yourself as the module leader if you are the main contact for this module’.


![](/assets/gitbook/image-21.png)


This banner will show in the report if there is no Primary Instructor assigned to the module.

The Course Contacts block is added to all new module pages by default, and can be located in the blocks drawer. This block uses the code `{coursecontacts}` to automatically pick up the profile information of those with the role Primary Instructor on the course.


![](/assets/gitbook/image-22.png)


This block is essential for this report to function correctly. If primary instructors are listed on the course page, then the report will search to see if the Course Contacts block is visible to students. If the Course Contacts block is hidden from students, or is not present on the course page, then the Contact Info Visible block will return the text ‘No contacts block’. The block will need to be made visible, or added for the report to identify this standard as being met.


![](/assets/gitbook/image-23.png)


## How to use it

The report should list the module leader as a Primary Instructor on the module page. Often though, users may find that the staff roles are incorrect. This happens when information in the main University systems becomes out of sync with live events. For example, if an instructor takes over a module at late notice, the module's previous module leader may still be showing as the Primary Instructor in the module. If the information in the report is not accurate, it is important to notify Registry at systemcourse@uel.ac.uk and correct the information in the main systems. While it is possible to modify instructor roles in Moodle, such changes will not be communicated to any other systems - so MS Teams, marking platforms and timetables will continue to show the previous instructor until corrected by Registry.


![](/assets/gitbook/image-24.png)


It should be very rare for the Course Contacts block to be missing, as it is enabled by default whenever module pages are created. However if, for whatever reason, you do see this here is how to fix it.






### 1. Check whether the Course Contacts block is visible



![](/assets/gitbook/image-25.png)


Go to the course page and open the blocks drawer on the right hand side of the page. If you do not see a block titled ‘Course Contacts’, then turn editing on inside your page.

Turn editing on using the edit toggle in to top corner.






### 2. Make the Course Contacts block visible



![](/assets/gitbook/image-26.png)


You may now see a Course Contacts block that has nothing in it. This indicates that the block is currently hidden from students. To make the Course Contacts block visible, click on the settings icon next to the block title, and select the option to ‘Show Course Contacts block’.






### 3. Add a missing Course Contacts block



![](/assets/gitbook/image-27.png)


If the Course Contacts block is completely missing, you may want to contact lta@uel.ac.uk giving the name of the module and explaining that the Course Contacts block is missing. Someone will then look at your course and add the block.

Alternatively, you can add the block yourself by clicking on the option in the blocks drawer to ‘Add a block’.

In the list of blocks that you then see, look for the one called ‘Text’.

Look for the 'Text' block in the blocks menu.






### 4. Configure the new text block



![](/assets/gitbook/image-28.png)


Click on the block and it will be added to your course page. To add content to the block, click on the block settings and select ‘Configure (new text block) block’.

Give the block the right name: Course Contacts. This name is important, as the report will be looking for it. Then in the text area for the block, simply type `{coursecontacts}`, and then save.

Adding the course contacts block.

The Course Contacts block will now appear normally in your blocks menu.




