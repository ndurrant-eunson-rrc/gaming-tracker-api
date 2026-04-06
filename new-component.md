# New Component Plan
 
## Selected Component
Nodemailer integration to provide automated email updates for user account
and game backlog activity.
 
## Why Nodemailer
- Notifies users when they sign up, update their entries, or complete a game in their backlog.
- Fits into the existing service layer to trigger events based on data changes.
- Provides a manageable challenge in handling external SMTP connections and asynchronous logic.
 
## Planned Integration
 
### Triggers
- Welcome Emails: Automated greeting sent upon successful user registration.
- Completion Alerts: Notifications sent when a game status is updated from "playing" to "completed."
- Update Confirmation: Optional notification for major changes to an existing backlog entry.
 
## Implementation Plan
- Install nodemailer and set up SMTP configuration using environment variables for security.
- Build a dedicated service to handle SMTP logic. 
- Implement auth so a welcome email triggers immediately after a new user signs up.
- Add a conditional check in updateEntry, such as if the new status is "completed" and the old status was not, trigger the completion email.
- Trigger a generic "entry updated" notification for non-status changes (e.g., updating a score or review).