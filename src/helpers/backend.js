import axios from 'axios';

let fbusers = JSON.parse(localStorage.getItem('fb-users')) || [];
let users = JSON.parse(localStorage.getItem('users')) || [];

function newUserId(userArray) {
  return userArray.length ? Math.max(...userArray.map((x) => x.id)) + 1 : 1;
}

export function configureApi() {
  let realFetch = window.fetch;
  window.fetch = function (url, opts) {
    return new Promise((resolve, reject) => {
      // server api call simulation using some delay
      setTimeout(() => {
        // authenticate
        if (url.endsWith('/authenticate') && opts.method === 'POST') {
          // get parameters from post request
          let params = JSON.parse(opts.body);

          // find if any user matches login credentials
          let filteredUsers = users.filter((user) => {
            return user.username === params.username && user.password === params.password;
          });

          if (filteredUsers.length) {
            // if login details are valid, return user details
            let user = filteredUsers[0];
            let responseJson = {
              id: user.id,
              username: user.username,
              fullname: user.fullname,
              token: 'jwt-token'
            };
            resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(responseJson)) });
          } else {
            // else return error
            reject('Username or password is incorrect');
          }

          return;
        }

        // fb-authenticate
        if (url.endsWith('/fb-authenticate') && opts.method === 'POST') {
          const { accessToken } = opts.body;

          axios
            .get(`https://graph.facebook.com/v8.0/me?access_token=${accessToken}`)
            .then((response) => {
              const { data } = response;
              if (data.error) return;
              setTimeout(() => {
                const response = { status: 401, data: { message: 'Unauthorized' } };
                reject(response);
              }, 500);

              let fbuser = fbusers.find((x) => x.facebookId === data.id);
              if (!fbuser) {
                // create new fbuser if first time logging in
                fbuser = {
                  id: newUserId(fbusers),
                  username: data.id,
                  fullname: data.name,
                  token: 'fb-token'
                };
                fbusers.push(fbuser);
                localStorage.setItem('fb-users', JSON.stringify(fbusers));
              }
            });

          //TODO: send some response
        }

        // signup user
        if (url.endsWith('/users/signup') && opts.method === 'POST') {
          // get new user object from post body
          let newUser = JSON.parse(opts.body);

          // validation
          let duplicateUser = users.filter((user) => {
            return user.username === newUser.username;
          }).length;
          if (duplicateUser) {
            reject('Username "' + newUser.username + '" is already taken');
            return;
          }

          // save new user
          newUser.id = newUserId(users);
          users.push(newUser);
          localStorage.setItem('users', JSON.stringify(users));

          // respond 200 OK
          resolve({ ok: true, text: () => Promise.resolve() });

          return;
        }

        // pass through any requests not handled above
        realFetch(url, opts).then((response) => resolve(response));
      }, 500);
    });
  };
}
