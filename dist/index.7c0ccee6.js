// Création de la classe Form
class Form {
    // Propriété privée #fields qui contient un tableau d’instances de la classe Field
    #fields = [];
    // Propriété privée #formElement qui est un objet HTMLFormElement représentant le formulaire
    #formElement = document.createElement("form");
    // Constructeur de la classe Form avec un paramètre 'title'
    constructor(title){
        // Propriété 'title' du formulaire
        this.title = title;
    }
    // Méthode pour ajouter une instance de Field au tableau #fields
    addField(field) {
        // Vérification si 'field' est une instance de la classe Field
        if (!(field instanceof Field)) throw new Error("You tried to add something that is not a field");
        // Ajout de 'field' au tableau #fields
        this.#fields.push(field);
        // Affichage d'un message dans la console
        console.log(`Added field ${field.name} to form`);
        // Permet l'enchaînement des méthodes
        return this;
    }
    // Méthode pour créer, afficher, insérer dans le DOM et traiter les événements liés au formulaire
    render() {
        // Création d'un élément <h1> avec le contenu du titre du formulaire
        const titleElement = document.createElement("h1");
        titleElement.textContent = this.title;
        // Ajout de l'élément <h1> au formulaire
        this.#formElement.append(titleElement);
        // Pour chaque instance de Field dans le tableau #fields, génération des éléments HTML correspondants
        this.#fields.forEach((field)=>{
            const fieldElement = field.render();
            // Ajout des éléments générés au formulaire
            this.#formElement.append(fieldElement);
        });
        // Création d'un bouton de type "submit" et ajout au formulaire
        const buttonElement = document.createElement("button");
        buttonElement.type = "submit";
        buttonElement.textContent = "Submit";
        this.#formElement.append(buttonElement);
        // Ajout d'un écouteur d'événement sur le formulaire pour l'événement "submit"
        // et liaison de la méthode #submit à l'événement tout en maintenant le contexte de la classe (this)
        this.#formElement.addEventListener("submit", this.#submit.bind(this));
        // Ajout du formulaire complet au DOM (dans le corps du document)
        document.body.append(this.#formElement);
    }
    // Méthode privée #submit, callback de l'événement "submit" du formulaire
    #submit(e) {
        // Empêcher le rechargement de la page lors de la soumission du formulaire
        e.preventDefault();
        // Collecte des valeurs des champs du formulaire dans un tableau d'objets
        const formData = this.#fields.map((field)=>{
            return {
                [field.name]: field.value
            };
        });
        // Recherche de l'élément toast dans le DOM et ajout de la classe "show" pour l'afficher
        const toastElement = document.querySelector("#toast");
        toastElement.classList.add("show");
        // Définition du texte de l'élément toast comme une représentation JSON de formData
        toastElement.textContent = formData.map((el)=>JSON.stringify(el));
        // Attente de 5 secondes, puis suppression de la classe "show" de l'élément toast pour le cacher
        setTimeout(()=>{
            toastElement.classList.remove("show");
        }, 5000);
        // Retourne formData
        return formData;
    }
}
// Création de la classe Field
class Field {
    // Propriété privée #inputElement qui est un objet HTMLInputElement représentant le champ
    #inputElement = document.createElement("input");
    // Constructeur de la classe Field avec un objet 'options' contenant 'name', 'type' et 'label'
    constructor(options){
        // Propriétés d'instance name, type et label
        this.name = options.name;
        this.type = options.type;
        this.label = options.label;
    }
    // Méthode pour créer les éléments HTML propres à un champ et les retourner
    render() {
        // Création d'un élément <div> avec la classe "field-container"
        const fieldContainer = document.createElement("div");
        fieldContainer.classList.add("field-container");
        // Création d'un élément <label> avec le texte du label de l'instance
        const labelElement = document.createElement("label");
        labelElement.innerText = this.label;
        // Attribution des propriétés name et type à l'objet #inputElement
        this.#inputElement.name = this.name;
        this.#inputElement.type = this.type;
        // Ajout des éléments <label> et <input> au <div>
        fieldContainer.append(labelElement);
        fieldContainer.append(this.#inputElement);
        // Retourne le <div> contenant les éléments du champ
        return fieldContainer;
    }
    // Getter pour la propriété value de l'objet #inputElement
    get value() {
        return this.#inputElement.value;
    }
}
// Création d'une instance de la classe Form avec le titre "Signup"
const form = new Form("Signup");
// Création d'instances de la classe Field avec différentes configurations
const email = new Field({
    name: "email",
    type: "email",
    label: "email"
});
const password = new Field({
    name: "password",
    type: "password",
    label: "password"
});
// Ajout des champs au formulaire et appel de la méthode render pour afficher le formulaire dans le DOM
form.addField(email).addField(password).render();

//# sourceMappingURL=index.7c0ccee6.js.map
