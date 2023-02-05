const main = document.querySelector('main')
const tags = document.querySelector('.tags')
const clear = document.querySelector('.clearBtn')

const elementCreator = (name, cname = '') => {
    let newE = document.createElement(`${name}`);
    if (cname) {
        newE.classList.add(`${cname}`)
    }
    return newE;
}


const getData = async () => {
    const res = await axios.get('data.json');
    const items = [];


    for (i = 0; i < res.data.length; i++) {
        items[i] = elementCreator('div', 'item');
        main.appendChild(items[i]);

        let item_left = elementCreator('div', 'item-left');
        items[i].appendChild(item_left);

        let logo = elementCreator('div', 'logo');
        let img = elementCreator('img');
        img.src = res.data[i].logo;

        item_left.appendChild(logo);
        logo.appendChild(img);



        let info = elementCreator('div', 'info');
        item_left.appendChild(info)
        let cname = elementCreator('div', 'cname');
        info.appendChild(cname)

        let company = elementCreator('span');
        company.innerText = res.data[i].company;
        cname.appendChild(company);

        if (res.data[i].new) {
            let newS = elementCreator('span', 'special');
            newS.innerText = 'New';
            cname.appendChild(newS);
        }
        if (res.data[i].featured) {
            let feat = elementCreator('span', 'special');
            feat.innerText = 'Featured';
            cname.appendChild(feat);
        }

        let h1 = elementCreator('h1');
        h1.innerText = res.data[i].position;
        info.appendChild(h1);

        let jobDetails = elementCreator('div', 'jobDetails');
        info.appendChild(jobDetails)

        let postedAt = elementCreator('span');
        postedAt.innerText = res.data[i].postedAt;
        jobDetails.appendChild(postedAt);

        let contract = elementCreator('span');
        contract.innerText = res.data[i].contract;
        jobDetails.appendChild(contract);

        let location = elementCreator('span');
        location.innerText = res.data[i].location;
        jobDetails.appendChild(location);

        let features = elementCreator('div', 'features');
        items[i].appendChild(features);

        let role = elementCreator('span')
        role.innerText = res.data[i].role;
        features.appendChild(role);

        let level = elementCreator('span')
        level.innerText = res.data[i].level;
        features.appendChild(level);

        res.data[i].languages.forEach(element => {
            let lang = elementCreator('span')
            lang.innerText = element;
            features.appendChild(lang);
        });

        res.data[i].tools.forEach(element => {
            let tool = elementCreator('span')
            tool.innerText = element;
            features.appendChild(tool);
        });
        items[i].classList.remove('hidden')
    }

    const filtered = [];
    const plate = [];

    const showFiltered = () => {
        for (let i = 0; i < items.length; i++) {
            if (filtered.includes(i)) {
                console.log('allGood');
            } else {
                items[i].classList.add('hidden')
            }
        }
    }
    const sort = (prop) => {
        filtered.splice(0, filtered.length);
        for (let i = 0; i < items.length; i++) {
            if (res.data[i].languages.includes(prop) || res.data[i].tools.includes(prop) || res.data[i].role.includes(prop) || res.data[i].level.includes(prop)) {
                // console.log('yup')
                // items[i].classList.add('visible')
                filtered.push(i);
            }
        }
        showFiltered();
    }
    const plateFilter = () => {
        plate.forEach(el => sort(el))
    }

    const plateShow = () => {

        const div = elementCreator('div');
        div.classList.add('visible');
        tags.appendChild(div)
        const feature = elementCreator('span');
        feature.innerText = plate[plate.length - 1];
        div.appendChild(feature);
        const btn = elementCreator('button');
        btn.innerHTML = '<img src="./images/icon-remove.svg" alt="">';
        div.appendChild(btn);
        btn.addEventListener('click', () => {
            let m = plate.indexOf(feature.innerText);
            plate.splice(m, 1)
            div.classList.add('hidden')
            for (i = 0; i < res.data.length; i++) {
                items[i].classList.remove('hidden')
            }
            plateFilter();
        })

        plateFilter();
    }

    clear.addEventListener('click', () => {
        plate.splice(0, plate.length);
        for (let kid of tags.children) {
            kid.classList.add('hidden');
        }
        for (i = 0; i < res.data.length; i++) {
            items[i].classList.remove('hidden')
        }
    })

    for (let item of items) {

        for (let kid of item.children[1].children) {
            kid.addEventListener('click', () => {
                if (plate.includes(kid.innerText)) {
                    plateFilter();
                } else {
                    plate.push(kid.innerText);
                    plateShow();
                }
                // console.log(filtered)
                console.log(plate)
            })
        }
    }

}
getData();




