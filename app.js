window.onload = () => {
    const loadMapBox = () => {
        let mymap = L.map('map').setView([-3.734464116057717,-38.46957206726074], 14),
            style_key = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpandmbXliNDBjZWd2M2x6bDk3c2ZtOTkifQ._QA7i5Mpkd_m30IGElHziw';

        L.tileLayer(style_key, {
            maxZoom: 18,
            id: 'mapbox.streets'
        }).addTo(mymap);

        return mymap;
    }
    
    const loadDataGrid = mymap => {
        const grid = new DataGrid('dataGrid');
        grid.setItems(["Escola", "Equipe", "Endereco", "Instrutor"]);
        grid.setPagination(3);
        grid.onRowClick = object => {
            mymap.setView([object.gym.lat, object.gym.lng],17);
            L.marker([object.gym.lat, object.gym.lng])
            .addTo(mymap)
            .bindPopup("<b>" + object.teamName + "</b>" + "<br>" + object.gym.address)
            .openPopup();
        }
        grid.setDataSource('http://jiujitsuteam.herokuapp.com/teams.json');
        grid.render();
    }

    const mymap = loadMapBox(); 
    loadDataGrid(mymap);
};