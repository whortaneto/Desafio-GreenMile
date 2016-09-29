function DataGrid(containerId) {

    const JIUJITSU_TEAM = 'http://jiujitsuteam.herokuapp.com/teams/',
          CROSS_ORIGIN = 'https://crossorigin.me/';

    let items, pagination, lastItem,
        gridContainer = document.getElementById(containerId),
        domTble = document.createElement('table'),
        domTbleBody = document.createElement('tbody'),
        domTbleHead = document.createElement('thead'),
        canLoadMoreData = true;

    domTble.style = 'width:100%';
    domTble.align = 'center';
    domTble.classList.add('datatable');

    this.onRowClick;

    getData = (url, asyn) => {
        return new Promise(
            (resolve, reject) => {
                xmlHttpRequest = new XMLHttpRequest();
                xmlHttpRequest.open('GET', CROSS_ORIGIN + url, asyn);
                xmlHttpRequest.onreadystatechange = () => {
                    if (xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == "200") {
                        resolve(JSON.parse(xmlHttpRequest.responseText));
                    } else {
                        reject('No data');
                    }
                };
                xmlHttpRequest.send();
            }
        )
    }

    buildHeader = () => {
        let tr = domTbleHead.insertRow(0);
        tr.align = 'center';

        for (let i = 0; i < items.length; i++) {
            let th = document.createElement('th');
            tr.appendChild(th);
            th.appendChild(document.createTextNode(items[i]));
        }
    }

    createColumns = (tr, values) => {
        for (let i = 0; i < values.length; i++) {
            tr.insertCell(i).innerText = values[i];
        }
    }

    buildBody = (id) => {
        that = this;

        getData(JIUJITSU_TEAM + id + '.json').then((item) => {
            if (item.places.length > 0)
                buildGymRows(item);
            else
                buildTeamRows(id, item);
        }, (error) => {
            if (error == "No data") {
                canLoadMoreData = false;
                document.getElementById("infiniteScroll").innerHTML = "No more data... :("
            } else {
                throw error;
            }
        });
        lastItem = id + 1;
    }

    buildGymRows = (item) => {
        for (let j = 0; j < item.places.length; j++) {
            if (domTbleBody.childElementCount < pagination) {
                let tr = domTbleBody.insertRow();
                tr.align = 'center';

                tr.onclick = () => {
                    if (document.querySelector('.clickedRow')) {
                        document.querySelector('.clickedRow').classList.remove("clickedRow")
                    }

                    tr.classList.add('clickedRow');
                    item.places[j].teamName = item.name;
                    that.onRowClick(item.places[j]);
                }

                createColumns(tr, [item.name, item.places[j].gym.title,
                    item.places[j].gym.address, item.creator.name
                ]);
            } else {
                break;
            }
        }
    }

    buildTeamRows = (id, item) => {
        let tr = domTbleBody.insertRow();
        tr.align = 'center';

        tr.onclick = () => {
            if (document.querySelector('.clickedRow')) {
                        document.querySelector('.clickedRow').classList.remove("clickedRow")
            }
            tr.classList.add('clickedRow');
        }

        createColumns(tr, [item.name, "-", "-", "-"]);

        if (domTbleBody.childElementCount < (pagination + pagination)) {
            buildBody(id + 1)
        }
    }

    buildNodes = () => {
        buildHeader();
        buildBody(2);
    }

    this.setItems = array => {
        items = array;
    }

    this.setPagination = number => {
        pagination = number;
    }

    initInfiniteScroll = () => {
        offsetForNewContent = document.querySelector("#map").clientHeight + 60;

        checkInfiniteScroll = (parentSelector, childSelector) => {

            let lastDiv = document.querySelector(parentSelector + childSelector),
                lastDivOffset = lastDiv.offsetTop + lastDiv.clientHeight,
                pageOffset = window.pageYOffset + window.innerHeight;

            if ((pageOffset > lastDivOffset + offsetForNewContent)) {
                buildBody(lastItem);
            }
        }

        let lastScrollTime = Date.now();
        const checkInterval = 50;

        /*
         * The method requestAnimationFrame is the secret of the infinite scroll
         * https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
         **/
        update = () => {
            requestAnimationFrame(update);

            let currScrollTime = Date.now();
            if ((lastScrollTime + checkInterval < currScrollTime) && canLoadMoreData) {
                checkInfiniteScroll("tbody", "> tr:last-child");
                lastScrollTime = currScrollTime;
            }
        }

        update();
    }

    this.render = () => {
        buildNodes();
        domTble.appendChild(domTbleHead);
        domTble.appendChild(domTbleBody);
        gridContainer.appendChild(domTble);
        initInfiniteScroll();
    }

}