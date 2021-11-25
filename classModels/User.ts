class User {
  constructor(
    public id: string,
    public firstname: string,
    public lastname: string,
    public imageUrl: string,
    public email: string,
    public studyProgramme: string,
    public chatNotifications: boolean,
    public eventNotifications: boolean
  ) {
    this.id = id;
    this.firstname = firstname;
    this.lastname = lastname;
    this.imageUrl = imageUrl;
    this.email = email;
    this.studyProgramme = studyProgramme;
    this.chatNotifications = chatNotifications;
    this.eventNotifications = eventNotifications;
  }
}

export default User;
