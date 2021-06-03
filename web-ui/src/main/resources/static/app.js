function init() {
    registerButtonClickedHandler(
        "fetchCustomersButton", onFetchCustomerButton
    );

    registerButtonClickedHandler(
        "fetchAddressesButton", onFetchAddressButton
    );
}

function onFetchCustomerButton() {
    fetchData('/customers').then(renderCustomersData);
}

function onFetchAddressButton() {
    fetchData('/addresses').then(renderAddressesData);
}

function renderAddressesData(data) {
    const table = getClearTable('addresses');
    renderText('fetchAddressesInfo', data["_links"]["self"].href);
    data["_embedded"]["addresses"].forEach(
        address => appendRow(
            table,
            address["addressName"], address["streetNumber"], address["streetName"],
            address["aptNumber"], address["city"], address["state"], address["zipCode"],
        )
    );
}

function renderCustomersData(data) {
    const table = getClearTable('customers');
    renderText('fetchCustomersInfo', data["_links"]["self"].href);
    data["_embedded"]["customers"].forEach(
        customer => appendRow(
            table,
            customer["firstName"], customer["lastName"],
        )
    );
}

function registerButtonClickedHandler(buttonId, eventHandler) {
    document.getElementById(buttonId).addEventListener('click', eventHandler);
}

function fetchData(endPoint) {
    return fetch(endPoint).then(data => data.json());
}

function getClearTable(tableId) {
    const table = document.getElementById(tableId);
    for (let i = table.rows.length - 1; i > 0; i--)
        table.deleteRow(i);
    return table;
}

function renderText(spanId, text) {
    document.getElementById(spanId).innerHTML = text;
}

function appendRow(table, ...values) {
    let row = table.insertRow();
    values.forEach(value => {
        let cell = row.insertCell();
        let textNode = document.createTextNode(value);
        cell.appendChild(textNode)
    })
}

document.addEventListener("DOMContentLoaded", init);