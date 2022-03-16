import 'bootstrap'
import '../css/main.scss'
import employmentHistory from './employment-history.json'

import '../files/organisations/bcklwn.png'
import '../files/organisations/wellpoint.png'
import '../files/organisations/jayars-distribution.jpg'
import '../files/organisations/pizza-hut.png'
import '../files/Daniel-Bartrum-CV.pdf'

$(function() {
    // Load employment cards
    employmentHistory.forEach(employmentInfo => {
        $(`#employment-cards`).append(
            $("<div>", { "class": `col ${ employmentInfo.isDeveloper ? "" : "non-" }developer` }).append($employmentCard(employmentInfo))
        )
    })

    // Add onclick events where needed
    $("#main-menu .nav-link").on("click", (e) => {
        $(e.currentTarget).addClass('active').siblings().removeClass('active')
    })

    $("#technical-experience-read-more").on("click", (e) => {
        $("#technical-experience-read-more").hide()
        $("#technical-experience-further-info").show()
        e.preventDefault()
    })

    $("#employment-toggle a").on("click", (e) => {
        $(".col.non-developer").toggle()
        $("#employment-toggle").hide()
        e.preventDefault()
    })

    // Update modal on load
    const employmentModal = document.getElementById('employment-info')
    employmentModal.addEventListener('show.bs.modal', function (event) {
        const button = event.relatedTarget
        const employer = button.getAttribute('data-employer')
        const position = button.getAttribute('data-position')

        const employmentInfo = employmentHistory.find(historyInfo => {
            return (historyInfo.employer === employer && historyInfo.position === position)
        })

        let websiteHtml
        if (employmentInfo.website)
            websiteHtml = `<a href="${employmentInfo.website}" target="_blank">${employmentInfo.website}</a>`
        else
            websiteHtml = `N/A`

        const $employmentModal = $(employmentModal)
        $employmentModal.find('.ei-position .ei-value').html(employmentInfo.position)
        $employmentModal.find('.ei-employer .ei-value').html(employmentInfo.employer)
        $employmentModal.find('.ei-website .ei-value').html(websiteHtml)
        $employmentModal.find('.ei-date .ei-value').html(`${employmentInfo.from} to ${employmentInfo.to}`)
        $employmentModal.find('.ei-duties .ei-value').html(employmentInfo.duties)
    })
})

function $employmentCard(employmentInfo) {
    const $card = $("<div>", { "class": "card" })
    const $cardBody = $("<div>", { "class": "card-body" })

    if (employmentInfo.employerLogo)
        $cardBody.append(`<img class="card-top-logo m-3" src="resources/${employmentInfo.employerLogo}" alt="${employmentInfo.employer} logo" />`)
    else
        $cardBody.append(`<div class="card-top-logo d-inline-block m-3">N/A</div>`)

    $cardBody.append(`<h3 class="card-title h4">${employmentInfo.position}</h3>`)
    $cardBody.append(`<hr class="w-25 mx-auto my-4" />`)
    $cardBody.append(`<p class="card-text">${employmentInfo.employer}</p>`)
    $cardBody.append(`<hr class="w-25 mx-auto my-4" />`)
    $cardBody.append(`<p class="card-text"><strong>${employmentInfo.from}</strong><br />to<br /><strong>${employmentInfo.to}</strong></p>`)

    const $cardFooter = $("<div>", { "class": "card-footer" })
    $cardFooter.append($("<button>", { 
        "type": "button", 
        "class": "btn btn-primary", 
        "text": "Learn more",
        "data-bs-toggle": "modal",
        "data-bs-target": "#employment-info",
        "data-employer": employmentInfo.employer,
        "data-position": employmentInfo.position
    }))

    return $card.append($cardBody).append($cardFooter)
}
