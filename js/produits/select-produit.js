function getLabelsAndInputs(parentElementId) {
    // Récupérer tous les éléments <label> enfants de l'élément parent
    const labelElements = document.querySelectorAll('#' + parentElementId + ' label');

    const labelsWithInputs = [];

    // Parcourir chaque élément <label>
    labelElements.forEach(label => {
        // Récupérer l'élément <input> fils de l'élément <label>
        const inputElement = label.querySelector('input');

        // Vérifier si l'élément <input> existe
        if (inputElement) {
            // Ajouter l'élément <label> à la liste
            labelsWithInputs.push(label);
        } else {
            console.log("Label sans élément <input> fils:", label);
        }
    });

    return labelsWithInputs;
}

function getArticles(conteneurArticles) {
    return Array.from(document.querySelectorAll('#' + conteneurArticles + ' article'));
}

function updateLabelSelect(event) {
    const input = event.target
    if (input.checked) {
        // Retirer la classe "select" de tous les labels
        labelsWithInputs.forEach(label => {
            label.classList.remove('select');
        });

        // Ajouter la classe "select" au label parent de l'élément <input> coché
        const parentLabel = input.closest('label');
        if (parentLabel) {
            parentLabel.classList.add('select');
        }
    }
}
function updateArticleSelect(event) {
    const input = event.target
    if (input.checked) {
        articles.forEach(article => {
            article.classList.remove('select');
        });

        
        const linkedArticle = document.getElementById("infos-" + input.id)
        if (linkedArticle) {
            linkedArticle.classList.add('select');
        }
    }
}


const labelsWithInputs = getLabelsAndInputs('selecteur');
const articles = getArticles('infos')

labelsWithInputs.forEach(label => {
    const input = label.querySelector('input')
    input.addEventListener('change', updateLabelSelect);
    input.addEventListener('change', updateArticleSelect);
});
