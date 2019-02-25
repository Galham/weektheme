function AppViewModel() {
    this.currentTheme = ko.observable("Bert");
    this.oldThemes = ko.observableArray([]);
    this.themeToSave = ko.observable("");
    getCurrentTheme();
    getOldThemes();
}

function getCurrentTheme(){
    var Http = new XMLHttpRequest();
    Http.responseType = 'json';
    var url='http://weektheme.azurewebsites.net/';
    Http.open("GET", url);
    Http.send();
    Http.onreadystatechange=(e)=>{
        console.log(Http.response.name);
        vm.currentTheme(Http.response.name);
    }
}

function getOldThemes(){
    var Http = new XMLHttpRequest();
    Http.responseType = 'json';
    var url='http://weektheme.azurewebsites.net/oldThemes';
    Http.open("GET", url);
    Http.send();
    Http.onreadystatechange=(e)=>{
        console.log(Http.response);
        vm.oldThemes(Http.response);
    }
}

function postThemeToSave(){
    var Http = new XMLHttpRequest();
    Http.responseType = 'json';
    var url='http://weektheme.azurewebsites.net/themes';
    var theme = vm.themeToSave();
    var themeJson = {name: theme};
    Http.open("POST", url);
    Http.setRequestHeader('Content-type', 'application/json');
    Http.send(JSON.stringify(themeJson));
    Http.onreadystatechange=(e)=>{
        console.log(Http.status);
    }
}




var vm = new AppViewModel()
// Activates knockout.js
ko.applyBindings(vm);