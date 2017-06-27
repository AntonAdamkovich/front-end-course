import _ from 'lodash';

/**
 * function for easy creating dom elements with attributes and inner text nodes
 *
 * @param {string} elementName - name of dom element
 * @param {object} attributes - attributes that have to have dom element
 * @param {(...string|...Element)} innerNodes - data that dom element have to contain as textNode's
 * @returns {Element} - ready to use dom element
 */
export default function createElement(elementName, attributes, ...innerNodes) {
    const element = document.createElement(elementName);

    if (_.isObject(attributes)) {
        _.forEach(attributes, (attributeValue, attributeName) => {
            element.setAttribute(attributeName, attributeValue);
        });
    }

    _.forEach(innerNodes, (node) => {
        let value;
        if (_.isString(node)) {
            value = document.createTextNode(node);
            element.appendChild(value);
        } else if (_.isElement(node)) {
            element.appendChild(node);
        }
    });
    return element;
}
