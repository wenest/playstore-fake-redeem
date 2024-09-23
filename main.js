const attribsToRemove = ['jsaction'];

function getRedeemButton(parent = document.body) {
    // Get all matching elements.
    const xpath = '//button[contains(text(), \'Redeem\')]';
    const redeemElements = document.evaluate(xpath, parent, null, XPathResult.ANY_TYPE, null);

    // Get the first matching element, if it is available.
    let element;
    let elements = [];
    try {
        element = redeemElements.iterateNext();
    } catch (DOMException) {
        element = null;
    }

    while (element) {
        elements.push(element);
        element = redeemElements.iterateNext();
    }

    return elements;
}

let observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        // Return if it does not have the needed properties.
        if (!mutation.addedNodes || !mutation.previousSibling) return;

        const elements = getRedeemButton(mutation.previousSibling);

        // Process all matching elements.
        for (const element of elements) {
            // Check if this element has already been processed.
            if (!element.getAttribute('lumium-secure-injected')) {
                // Set the attribute.
                element.setAttribute('lumium-secure-injected', 'true');

                // Remove attributes so we can use our own JS.
                for (const attrib of attribsToRemove) {
                    console.log(attrib);
                    element.removeAttribute(attrib);
                }

                // Add our click listener.
                element.onclick = genConfirmation;
            }
        }
    });
});

observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: false,
    characterData: false
});

var headerEls = [];

function getHeaderElementsByXpath() {
    // Get the elements by xpath
    const xpath = '//div[contains(text(), \'Redeem Code\')]';
    const elementResults = document.evaluate(xpath, document.body, null, XPathResult.ANY_TYPE, null);

    // Get the first element
    let elements = [];
    let currentElement;
    try {
        let el = elementResults.iterateNext()
        if (el) {
            currentElement = el;
        }
    } catch (DOMException) {}

    // Put the elements in an array
    while (currentElement) {
        elements.push(currentElement);
        currentElement = elementResults.iterateNext();
    }

    // Set the cache variable and return the value
    if (elements.length) {
        headerEls = elements;
    }
    return elements;
}

function getHeaderElements() {
    return getHeaderElementsByXpath() || headerEls;
}

function genConfirmation() {
    console.log('hello');
    const headerElements = getHeaderElements();
    console.log(headerElements);

    for (const element of headerElements) {
        const headerText = element.innerHTML.split('<div')[0];
        const newHTML = element.innerHTML.replaceAll(headerText, 'Confirmation');
        element.innerHTML = newHTML;
        element.classList.add('lumium-redeem-header-text'); // Make it easier to find in the future
    }

    // Remove the input.
    const input = document.querySelector('input[type="text"][aria-label="Enter gift card or promo code"]')
        .parentElement.parentElement.parentElement.parentElement;
    input.parentElement.removeChild(input);

    // Set the text.
    const xpath = '//div[contains(text(), \'By clicking\')]';
    const element = document.evaluate(xpath, document.body, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null)
        .singleNodeValue;
    element.classList.add('lumium-redeem-description-text'); // Make it easier to find in the future
    element.innerHTML = 'You are about to add $500.00 to your account.<br><br>By clicking Redeem, you agree to the Gift Card & Promotional Code <a class="MAc20b" target="_blank" href="https://play.google.com/intl/en_us/about/redeem-terms.html">Terms and Conditions</a>, as applicable.';

    // Update the redeem button.
    const buttonElements = getRedeemButton();
    for (const element of buttonElements) {
        element.onclick = submitGift;
    }
}

function submitGift() {
    const headerElements = document.querySelectorAll('.lumium-redeem-header-text');
    for (const element of headerElements) {
        const currentText = element.innerHTML.split('<div')[0];
        element.innerHTML = element.innerHTML.replaceAll(currentText, 'Congratulations!');
    }

    document.querySelector('.lumium-redeem-description-text')
        .innerHTML = '$500.00 has been added to your account.';

    const buttonElements = getRedeemButton();
    for (const element of buttonElements) {
        element.innerHTML = 'Exit';
        element.onclick = exitPrompt;
    }
}

const exitPrompt = () => window.location = 'https://play.google.com/redeem';


// Remove Google Play balance
function removePlayBalance() {
    const text = document.evaluate('//div[contains(text(), \'Google Play balance\')]', document.body, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null)
        .singleNodeValue;
    if (text) {
        text.innerHTML = 'Google Play balance';
    }
}

setInterval(removePlayBalance, 100);
