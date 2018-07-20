async componentDidMount(){
  let query = window.location.search;
  let view = query.replace(/\?|\=/g,' ').split(' ')[1];
  //maybe set the view to the application state to controle button displays?
  this.setState({view});
  console.log({view});

  if(view==='submission'){
    //Just change the token on the other side to take topic & assign

    let unparsedToken = query.replace(/\?|\=/g,' ').split(' ')[2];
    console.log({unparsedToken});
    let parsedToken = jwt.verify(unparsedToken, 'johnisbald');
    let {assignment, topic, user} = parsedToken;
    //Doing this seems weird because it logs the instructor into a student's account
    let profile = await api.login(user);
    this.props.addUser(profile);

    //I'd like to use getAssignment() as this is the link that's clicked in the sidebar, but it takes (topic, assignment) as parameters. I think i just have the assignment _id currently. I guess I could pass all this in with the jwt.sign, or what happens if i do an api call with the assignmentID here and then call get assignment?
    this.getAssignment(assignment, topic);
  }

//   if(view==='assignment'){
//     //We're going to assume they have a cookie
//     //

//   }

//   else{
//    let token = cookies.load('Token'); 
  
//    if (token) {
//       let profile = await api.login(token);
//      this.props.addUser(profile);
//     }
//  }
}




//   if(!token){
    //     let query = window.location.search;
    //     console.log({query});
    // let view = query.replace(/\?|\=/g,' ').split(' ')[1];
    // //maybe set the view to the application state to controle button displays?
    // this.setState({view});
    // console.log({view});

    // if(view==='submission'){
    //   //Just change the token on the other side to take topic & assign

    //   let unparsedToken = query.replace(/\?|\=/g,' ').split(' ')[2];
    //   console.log({unparsedToken});
    //   let parsedToken = jwt.verify(unparsedToken, 'johnisbald');
    //   let {assignment, topic, user} = parsedToken;
    //   //Doing this seems weird because it logs the instructor into a student's account
    //   let profile = await api.login(user);
    //   this.props.addUser(profile);

    //   //I'd like to use getAssignment() as this is the link that's clicked in the sidebar, but it takes (topic, assignment) as parameters. I think i just have the assignment _id currently. I guess I could pass all this in with the jwt.sign, or what happens if i do an api call with the assignmentID here and then call get assignment?
    //   this.getAssignment(assignment, topic);
    // }
      // }
    // }