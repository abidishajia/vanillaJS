const btn = document.querySelector('#submit');
const postsDiv = document.querySelector('#postsDiv');
const usersURL = "https://jsonplaceholder.typicode.com/users"
const postsURL = "https://jsonplaceholder.typicode.com/posts"

btn.addEventListener('click', () => {
    fetch(postsURL)
    .then(res => res.json())
    .then(postsJson => {
        fetch(usersURL)
            .then(res => res.json())
            .then(usersJson => {
                let comb = {}
                usersJson.forEach((user) => {
                    comb[user.id] = user;
                });

                let res = postsJson.map(post => {
                    let user = comb[post.userId];  
                    if(user){
                      for(let key in user){
                        post[key] = user[key]
                      }
                    }
                    return post;
                  });
                  postsDisplay(res)
            })
    })
    .catch(err => console.log(err))
    postsDiv.innerHTML = "";
})


const postsDisplay = (data) => {
    const value = document.querySelector('#title').value
    for (let post in data) {
        let title = data[post]['title']
        let body = data[post]['body']
        let email  = data[post]['email']
        let name = data[post]['name']
        let phone = data[post]['phone']
        let username = data[post]['username']
        let website = data[post]['website']

        if (title === value || title.indexOf(value) != -1) {

            let card = document.createElement('div')
            card.classList.add('card', 'text-center', 'mb-3')

            let cardBody = document.createElement('div')
            cardBody.classList.add('card-body')

            let h5 = document.createElement('h5')
            h5.textContent = title
            h5.classList.add('card-title')

            let para = document.createElement('p')
            para.textContent = body
            h5.classList.add('card-text', 'px-5')

            let footer = document.createElement('div')
            footer.classList.add('card-footer', 'text-muted', 'text-right')

            let usernameSpan = document.createElement('span')
            usernameSpan.textContent = `Post by ${username}`
            

            let userInfo = document.createElement('div')
            userInfo.innerHTML = `<b>Email:</b> ${email} <br/>
                                  <b>Name :</b> ${name} <br/>
                                  <b>Website:</b> <a href="${website}"> ${website} </a> <br/>
                                  <b>Phone:</b> ${phone}` 
            userInfo.style.display = "none";
            userInfo.classList.add('text-left', 'pl-3')

            usernameSpan.addEventListener('click', () => {
                if (userInfo.style.display === "none") {
                    card.appendChild(userInfo)
                    userInfo.style.display = "block";
                  } else {
                    userInfo.style.display = "none";
                }
            })

            footer.appendChild(usernameSpan)

            card.appendChild(cardBody)
            card.appendChild(h5)
            card.appendChild(para)
            card.appendChild(footer)

            postsDiv.appendChild(card);
        } 
    }
}

document.querySelector('#clear').addEventListener('click', () => postsDiv.innerHTML = "")