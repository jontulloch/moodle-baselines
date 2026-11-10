# 03 Profile Picture

The **03 profile picture** checks to see if the instructor has a profile picture rather than the default avatar. This is significant because it can make a significant difference to students if they know what their instructors look like. It can help them be more confident in knowing who they can approach to ask questions, and it creates a human link to the module's online content that can improve engagement.

### Appearance

The top of the detailed report table explains the criteria through which the pass / fail result has been achieved on the summary report and the in the progress bar. Below that explanation, there are two columns: One titled ‘Instructor’ and the other ‘Log entries’.


![](/assets/gitbook/image-29.png)


The instructor column includes the profile picture associated with the user, the name of the instructor, and an editor icon which can be used to directly access the profile settings. The log entries column shows the number of log entries that user has made on the course over the last two months.

### What it does

As with the standard 02 Contact Information, this report attempts to identify who is likely to be the main contact for students in relation to the module. This is often difficult, because modules can have multiple Primary Instructors depending on whether the module is being team taught, and how course leaders or moderators have been enrolled on the module. The solution to this is to single out the Primary Instructor who is engaging most frequently with the module, with the assumption being that this is likely to be the module leader or at least one of the module leaders.

Because of these complexities, **the report will return a pass if any of the module's primary instructors have a profile picture showing to students**, but will also list the instructors in the order of frequency with which the course is accessed, so it is possible to gauge the module leader.

The detailed report firstly identifies all those enrolled on the course with a Primary Instructor role. These are listed along with their profile picture. By default, profile pictures in Moodle are simply the initials of the user against a plain background:


![](/assets/gitbook/image-30.png)


This default is read by Moodle as being 0 profile pictures. When a user edits their profile and adds a picture into the profile picture area, Moodle reads this as 1 profile picture. This makes it easy to determine whether a profile picture has been added or not - although it does not distinguish the type of picture provided. For example, a user might upload a picture that gives users no real indication (or at least only a tangential clue) as to what the user actually looks like:


![](/assets/gitbook/image-32.png)


The report is unable to identify this, and so it is left to the discretion of the instructor to ensure that their profile picture is relevant and helpful to students.

The report then collects data about the number of times each primary instructor has logged into the module page over the last two months. This is do to try and highlight the primary instructor with the main responsibility for the course. There are other ways in which this could be achieved (i.e. focusing on the primary instructor that is enrolled via ‘external database’ - signifying they have been added as the module leader via SITS), but in testing these methods proved less reliable. In testing, the primary instructor that has accessed the module most is almost always the main module leader. The exceptions to this are after completion of the module, after which other instructors who might be marking parts of the assessment can access the module page with equal frequency. For this reason, the specification has been made limiting the log count to the last two months - this seemed to be a reliable time to ensure the log count accuracy.

### How to use it

The report will list all those enrolled on the course with the role of Primary Instructor. The primary instructors will be listed in order of who has accessed the course most frequently in the last two months. The number of log entries is listed in the ‘Log entries' column. The meeting of this standard is evaluated based on the user at the top of this list - assuming that this is the module's main instructor.

The profile picture associated with each individual will appear next to their name. If there is no profile picture associate with the name, the report will show the text ‘No profile picture’:


![](/assets/gitbook/image-33.png)


Your own name will have an edit icon next to it. This link will take you directly to your profile information page where a profile picture can be uploaded or changed. There is no edit icon next the name of other participants, as you only have access to your own profile information.


![](/assets/gitbook/image-34.png)


To meet the standard, the name at the top of the list of instructors needs to have a picture next to their name. If you are that person, you can add or edit profile pictures by clicking on the edit icon next to your name.
