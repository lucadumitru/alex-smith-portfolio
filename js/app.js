(() => {
    var __webpack_modules__ = {
        615: function(module) {
            /*!
* fullPage 4.0.15
* https://github.com/alvarotrigo/fullPage.js
*
* @license GPLv3 for open source use only
* or Fullpage Commercial License for commercial use
* http://alvarotrigo.com/fullPage/pricing/
*
* Copyright (C) 2018 http://alvarotrigo.com/fullPage - A project by Alvaro Trigo
*/
            (function(global, factory) {
                true ? module.exports = factory() : 0;
            })(0, (function() {
                "use strict";
                if (!Array.prototype.find) Object.defineProperty(Array.prototype, "find", {
                    value: function value(predicate) {
                        if (null == this) throw new TypeError('"this" is null or not defined');
                        var o = Object(this);
                        var len = o.length >>> 0;
                        if ("function" !== typeof predicate) throw new TypeError("predicate must be a function");
                        var thisArg = arguments[1];
                        var k = 0;
                        while (k < len) {
                            var kValue = o[k];
                            if (predicate.call(thisArg, kValue, k, o)) return kValue;
                            k++;
                        }
                        return;
                    }
                });
                if (!Array.from) Array.from = function() {
                    var toStr = Object.prototype.toString;
                    var isCallable = function isCallable(fn) {
                        return "function" === typeof fn || "[object Function]" === toStr.call(fn);
                    };
                    var toInteger = function toInteger(value) {
                        var number = Number(value);
                        if (isNaN(number)) return 0;
                        if (0 === number || !isFinite(number)) return number;
                        return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
                    };
                    var maxSafeInteger = Math.pow(2, 53) - 1;
                    var toLength = function toLength(value) {
                        var len = toInteger(value);
                        return Math.min(Math.max(len, 0), maxSafeInteger);
                    };
                    return function from(arrayLike) {
                        var C = this;
                        var items = Object(arrayLike);
                        if (null == arrayLike) throw new TypeError("Array.from requires an array-like object - not null or undefined");
                        var mapFn = arguments.length > 1 ? arguments[1] : void void 0;
                        var T;
                        if ("undefined" !== typeof mapFn) {
                            if (!isCallable(mapFn)) throw new TypeError("Array.from: when provided, the second argument must be a function");
                            if (arguments.length > 2) T = arguments[2];
                        }
                        var len = toLength(items.length);
                        var A = isCallable(C) ? Object(new C(len)) : new Array(len);
                        var k = 0;
                        var kValue;
                        while (k < len) {
                            kValue = items[k];
                            if (mapFn) A[k] = "undefined" === typeof T ? mapFn(kValue, k) : mapFn.call(T, kValue, k); else A[k] = kValue;
                            k += 1;
                        }
                        A.length = len;
                        return A;
                    };
                }();
                var win = window;
                var doc = document;
                var isTouchDevice = navigator.userAgent.match(/(iPhone|iPod|iPad|Android|playbook|silk|BlackBerry|BB10|Windows Phone|Tizen|Bada|webOS|IEMobile|Opera Mini)/);
                var isMacDevice = /(Mac|iPhone|iPod|iPad)/i.test(win.navigator.userAgent);
                var isTouch = "ontouchstart" in win || navigator.msMaxTouchPoints > 0 || navigator.maxTouchPoints;
                var isIE11 = !!window.MSInputMethodContext && !!document.documentMode;
                var focusableElementsString = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]';
                var FP = {
                    test: {},
                    shared: {}
                };
                var extensions = [ "parallax", "scrollOverflowReset", "dragAndMove", "offsetSections", "fadingEffect", "responsiveSlides", "continuousHorizontal", "interlockedSlides", "scrollHorizontally", "resetSliders", "cards", "dropEffect", "waterEffect" ];
                if (win.NodeList && !NodeList.prototype.forEach) NodeList.prototype.forEach = function(callback, thisArg) {
                    thisArg = thisArg || window;
                    for (var i = 0; i < this.length; i++) callback.call(thisArg, this[i], i, this);
                };
                if ("function" != typeof Object.assign) Object.defineProperty(Object, "assign", {
                    value: function assign(target, varArgs) {
                        if (null == target) throw new TypeError("Cannot convert undefined or null to object");
                        var to = Object(target);
                        for (var index = 1; index < arguments.length; index++) {
                            var nextSource = arguments[index];
                            if (null != nextSource) for (var nextKey in nextSource) if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) to[nextKey] = nextSource[nextKey];
                        }
                        return to;
                    },
                    writable: true,
                    configurable: true
                });
                if (!String.prototype.padStart) String.prototype.padStart = function padStart(targetLength, padString) {
                    targetLength >>= 0;
                    padString = String("undefined" !== typeof padString ? padString : " ");
                    if (this.length > targetLength) return String(this); else {
                        targetLength -= this.length;
                        if (targetLength > padString.length) padString += Array.apply(null, Array(targetLength)).map((function() {
                            return padString;
                        })).join("");
                        return padString.slice(0, targetLength) + String(this);
                    }
                };
                function showError(type, text) {
                    win.console && win.console[type] && win.console[type]("fullPage: " + text);
                }
                function isVisible(el) {
                    var style = win.getComputedStyle(el);
                    return "none" !== style.display;
                }
                function getVisible(elements) {
                    return Array.from(elements).filter((function(e) {
                        return isVisible(e);
                    }));
                }
                function $(selector, context) {
                    context = arguments.length > 1 ? context : document;
                    return context ? context.querySelectorAll(selector) : null;
                }
                function deepExtend(out) {
                    out = out || {};
                    for (var i = 1, len = arguments.length; i < len; ++i) {
                        var obj = arguments[i];
                        if (!obj) continue;
                        for (var key in obj) {
                            if (!obj.hasOwnProperty(key) || "__proto__" == key || "constructor" == key) continue;
                            if ("[object Object]" === Object.prototype.toString.call(obj[key])) {
                                out[key] = deepExtend(out[key], obj[key]);
                                continue;
                            }
                            out[key] = obj[key];
                        }
                    }
                    return out;
                }
                function hasClass(el, className) {
                    if (null == el) return false;
                    return el.classList.contains(className);
                }
                function getWindowHeight() {
                    return "innerHeight" in win ? win.innerHeight : doc.documentElement.offsetHeight;
                }
                function getWindowWidth() {
                    return win.innerWidth;
                }
                function css(items, props) {
                    items = getList(items);
                    var key;
                    for (key in props) if (props.hasOwnProperty(key)) if (null !== key) for (var i = 0; i < items.length; i++) {
                        var item = items[i];
                        item.style[key] = props[key];
                    }
                    return items;
                }
                function prev(item) {
                    return item.previousElementSibling;
                }
                function next(item) {
                    return item.nextElementSibling;
                }
                function last(item) {
                    return item[item.length - 1];
                }
                function index(item, selector) {
                    item = isArrayOrList(item) ? item[0] : item;
                    var children = null != selector ? $(selector, item.parentNode) : item.parentNode.childNodes;
                    var num = 0;
                    for (var i = 0; i < children.length; i++) {
                        if (children[i] == item) return num;
                        if (1 == children[i].nodeType) num++;
                    }
                    return -1;
                }
                function getList(item) {
                    return !isArrayOrList(item) ? [ item ] : item;
                }
                function hide(el) {
                    el = getList(el);
                    for (var i = 0; i < el.length; i++) el[i].style.display = "none";
                    return el;
                }
                function show(el) {
                    el = getList(el);
                    for (var i = 0; i < el.length; i++) el[i].style.display = "block";
                    return el;
                }
                function isArrayOrList(el) {
                    return "[object Array]" === Object.prototype.toString.call(el) || "[object NodeList]" === Object.prototype.toString.call(el);
                }
                function addClass(el, className) {
                    el = getList(el);
                    for (var i = 0; i < el.length; i++) {
                        var item = el[i];
                        item.classList.add(className);
                    }
                    return el;
                }
                function removeClass(el, className) {
                    el = getList(el);
                    var classNames = className.split(" ");
                    for (var a = 0; a < classNames.length; a++) {
                        className = classNames[a];
                        for (var i = 0; i < el.length; i++) {
                            var item = el[i];
                            item.classList.remove(className);
                        }
                    }
                    return el;
                }
                function appendTo(el, parent) {
                    parent.appendChild(el);
                }
                function wrap(toWrap, wrapper, isWrapAll) {
                    var newParent;
                    wrapper = wrapper || doc.createElement("div");
                    for (var i = 0; i < toWrap.length; i++) {
                        var item = toWrap[i];
                        if (isWrapAll && !i || !isWrapAll) {
                            newParent = wrapper.cloneNode(true);
                            item.parentNode.insertBefore(newParent, item);
                        }
                        newParent.appendChild(item);
                    }
                    return toWrap;
                }
                function wrapAll(toWrap, wrapper) {
                    wrap(toWrap, wrapper, true);
                }
                function wrapInner(parent, wrapper) {
                    parent.appendChild(wrapper);
                    while (parent.firstChild !== wrapper) wrapper.appendChild(parent.firstChild);
                }
                function unwrap(wrapper) {
                    var wrapperContent = doc.createDocumentFragment();
                    while (wrapper.firstChild) wrapperContent.appendChild(wrapper.firstChild);
                    wrapper.parentNode.replaceChild(wrapperContent, wrapper);
                }
                function closest(el, selector) {
                    if (el && 1 === el.nodeType) {
                        if (matches(el, selector)) return el;
                        return closest(el.parentNode, selector);
                    }
                    return null;
                }
                function after(reference, el) {
                    insertBefore(reference, reference.nextSibling, el);
                }
                function before(reference, el) {
                    insertBefore(reference, reference, el);
                }
                function insertBefore(reference, beforeElement, el) {
                    if (!isArrayOrList(el)) {
                        if ("string" == typeof el) el = createElementFromHTML(el);
                        el = [ el ];
                    }
                    for (var i = 0; i < el.length; i++) reference.parentNode.insertBefore(el[i], beforeElement);
                }
                function getScrollTop() {
                    var docElement = doc.documentElement;
                    return (win.pageYOffset || docElement.scrollTop) - (docElement.clientTop || 0);
                }
                function siblings(el) {
                    return Array.prototype.filter.call(el.parentNode.children, (function(child) {
                        return child !== el;
                    }));
                }
                function preventDefault(event) {
                    event.preventDefault();
                }
                function getAttr(el, attr) {
                    return el.getAttribute(attr);
                }
                function docAddEvent(event, callback, options) {
                    doc.addEventListener(event, callback, "undefined" === options ? null : options);
                }
                function windowAddEvent(event, callback, options) {
                    win.addEventListener(event, callback, "undefined" === options ? null : options);
                }
                function docRemoveEvent(event, callback, options) {
                    doc.removeEventListener(event, callback, "undefined" === options ? null : options);
                }
                function windowRemoveEvent(event, callback, options) {
                    win.removeEventListener(event, callback, "undefined" === options ? null : options);
                }
                function isFunction(item) {
                    if ("function" === typeof item) return true;
                    var type = Object.prototype.toString.call(item);
                    return "[object Function]" === type || "[object GeneratorFunction]" === type;
                }
                function trigger(el, eventName, data) {
                    var event;
                    data = "undefined" === typeof data ? {} : data;
                    if ("function" === typeof win.CustomEvent) event = new CustomEvent(eventName, {
                        detail: data
                    }); else {
                        event = doc.createEvent("CustomEvent");
                        event.initCustomEvent(eventName, true, true, data);
                    }
                    el.dispatchEvent(event);
                }
                function matches(el, selector) {
                    return (el.matches || el.matchesSelector || el.msMatchesSelector || el.mozMatchesSelector || el.webkitMatchesSelector || el.oMatchesSelector).call(el, selector);
                }
                function toggle(el, value) {
                    if ("boolean" === typeof value) for (var i = 0; i < el.length; i++) el[i].style.display = value ? "block" : "none";
                    return el;
                }
                function createElementFromHTML(htmlString) {
                    var div = doc.createElement("div");
                    div.innerHTML = htmlString.trim();
                    return div.firstChild;
                }
                function remove(items) {
                    items = getList(items);
                    for (var i = 0; i < items.length; i++) {
                        var item = items[i];
                        if (item && item.parentElement) item.parentNode.removeChild(item);
                    }
                }
                function untilAll(item, selector, fn) {
                    var sibling = item[fn];
                    var siblings = [];
                    while (sibling) {
                        if (matches(sibling, selector) || null == selector) siblings.push(sibling);
                        sibling = sibling[fn];
                    }
                    return siblings;
                }
                function nextAll(item, selector) {
                    return untilAll(item, selector, "nextElementSibling");
                }
                function prevAll(item, selector) {
                    return untilAll(item, selector, "previousElementSibling");
                }
                function toArray(objectData) {
                    return Object.keys(objectData).map((function(key) {
                        return objectData[key];
                    }));
                }
                function getLast(items) {
                    return items[items.length - 1];
                }
                function getAverage(elements, number) {
                    var sum = 0;
                    var lastElements = elements.slice(Math.max(elements.length - number, 1));
                    for (var i = 0; i < lastElements.length; i++) sum += lastElements[i];
                    return Math.ceil(sum / number);
                }
                function setSrc(element, attribute) {
                    element.setAttribute(attribute, getAttr(element, "data-" + attribute));
                    element.removeAttribute("data-" + attribute);
                }
                function getParentsUntil(item, topParentSelector) {
                    var parents = [ item ];
                    do {
                        item = item.parentNode;
                        parents.push(item);
                    } while (!matches(item, topParentSelector));
                    return parents;
                }
                window["fp_utils"] = {
                    $,
                    deepExtend,
                    hasClass,
                    getWindowHeight,
                    css,
                    prev,
                    next,
                    last,
                    index,
                    getList,
                    hide,
                    show,
                    isArrayOrList,
                    addClass,
                    removeClass,
                    appendTo,
                    wrap,
                    wrapAll,
                    unwrap,
                    closest,
                    after,
                    before,
                    insertBefore,
                    getScrollTop,
                    siblings,
                    preventDefault,
                    isFunction,
                    trigger,
                    matches,
                    toggle,
                    createElementFromHTML,
                    remove,
                    untilAll,
                    nextAll,
                    prevAll,
                    showError
                };
                var utils = Object.freeze({
                    __proto__: null,
                    showError,
                    isVisible,
                    getVisible,
                    $,
                    deepExtend,
                    hasClass,
                    getWindowHeight,
                    getWindowWidth,
                    css,
                    prev,
                    next,
                    last,
                    index,
                    getList,
                    hide,
                    show,
                    isArrayOrList,
                    addClass,
                    removeClass,
                    appendTo,
                    wrap,
                    wrapAll,
                    wrapInner,
                    unwrap,
                    closest,
                    after,
                    before,
                    insertBefore,
                    getScrollTop,
                    siblings,
                    preventDefault,
                    getAttr,
                    docAddEvent,
                    windowAddEvent,
                    docRemoveEvent,
                    windowRemoveEvent,
                    isFunction,
                    trigger,
                    matches,
                    toggle,
                    createElementFromHTML,
                    remove,
                    untilAll,
                    nextAll,
                    prevAll,
                    toArray,
                    getLast,
                    getAverage,
                    setSrc,
                    getParentsUntil
                });
                function _typeof(obj) {
                    "@babel/helpers - typeof";
                    if ("function" === typeof Symbol && "symbol" === typeof Symbol.iterator) _typeof = function(obj) {
                        return typeof obj;
                    }; else _typeof = function(obj) {
                        return obj && "function" === typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
                    };
                    return _typeof(obj);
                }
                var EventEmitter = {
                    events: {},
                    on: function on(event, listener) {
                        var _this = this;
                        if ("object" !== _typeof(this.events[event])) this.events[event] = [];
                        this.events[event].push(listener);
                        return function() {
                            return _this.removeListener(event, listener);
                        };
                    },
                    removeListener: function removeListener(event, listener) {
                        if ("object" === _typeof(this.events[event])) {
                            var idx = this.events[event].indexOf(listener);
                            if (idx > -1) this.events[event].splice(idx, 1);
                        }
                    },
                    emit: function emit(event) {
                        var _this2 = this;
                        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) args[_key - 1] = arguments[_key];
                        if ("object" === _typeof(this.events[event])) this.events[event].forEach((function(listener) {
                            return listener.apply(_this2, args);
                        }));
                    },
                    once: function once(event, listener) {
                        var _this3 = this;
                        var remove = this.on(event, (function() {
                            remove();
                            for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) args[_key2] = arguments[_key2];
                            listener.apply(_this3, args);
                        }));
                    }
                };
                var state = {
                    numSections: 0,
                    numSlides: 0,
                    slides: [],
                    sections: [],
                    activeSection: null,
                    scrollTrigger: null,
                    isBeyondFullpage: false,
                    aboutToScrollToFullPage: false,
                    slideMoving: false,
                    isResizing: false,
                    isScrolling: false,
                    lastScrolledDestiny: void 0,
                    lastScrolledSlide: void 0,
                    activeAnimation: false,
                    canScroll: true,
                    touchDirection: "none",
                    wheelDirection: "none",
                    isGrabbing: false,
                    isUsingWheel: false,
                    isWindowFocused: true,
                    previousDestTop: 0,
                    windowsHeight: getWindowHeight(),
                    isDoingContinousVertical: false,
                    timeouts: {},
                    scrollY: 0,
                    scrollX: 0
                };
                win.state = state;
                function setState(props) {
                    Object.assign(state, props);
                }
                function getState() {
                    return state;
                }
                function getActivePanel() {
                    return state.activeSection && state.activeSection.activeSlide ? state.activeSection.activeSlide : state.activeSection;
                }
                var events = {
                    onAfterRenderNoAnchor: "onAfterRenderNoAnchor",
                    onClickOrTouch: "onClickOrTouch",
                    moveSlideLeft: "moveSlideLeft",
                    moveSlideRight: "moveSlideRight",
                    onInitialise: "onInitialise",
                    beforeInit: "beforeInit",
                    bindEvents: "bindEvents",
                    onDestroy: "onDestroy",
                    contentChanged: "contentChanged",
                    onScrollOverflowScrolled: "onScrollOverflowScrolled",
                    onScrollPageAndSlide: "onScrollPageAndSlide",
                    onKeyDown: "onKeyDown",
                    onMenuClick: "onMenuClick",
                    scrollPage: "scrollPage",
                    landscapeScroll: "landscapeScroll",
                    scrollBeyondFullpage: "scrollBeyondFullpage",
                    onPerformMovement: "onPerformMovement",
                    afterSectionLoads: "afterSectionLoads",
                    afterSlideLoads: "afterSlideLoads"
                };
                EventEmitter.on(events.bindEvents, bindEvents$c);
                function bindEvents$c() {
                    [ "click", "touchstart" ].forEach((function(eventName) {
                        docAddEvent(eventName, delegatedEvents);
                    }));
                    windowAddEvent("focus", focusHandler);
                    internalEvents();
                }
                function internalEvents() {
                    EventEmitter.on(events.onDestroy, onDestroy$8);
                }
                function delegatedEvents(e) {
                    EventEmitter.emit(events.onClickOrTouch, {
                        e,
                        target: e.target
                    });
                }
                function onDestroy$8() {
                    [ "click", "touchstart" ].forEach((function(eventName) {
                        docRemoveEvent(eventName, delegatedEvents);
                    }));
                }
                function focusHandler() {
                    setState({
                        isWindowFocused: true
                    });
                }
                var WRAPPER = "fullpage-wrapper";
                var WRAPPER_SEL = "." + WRAPPER;
                var RESPONSIVE = "fp-responsive";
                var NO_TRANSITION = "fp-notransition";
                var DESTROYED = "fp-destroyed";
                var ENABLED = "fp-enabled";
                var VIEWING_PREFIX = "fp-viewing";
                var ACTIVE = "active";
                var ACTIVE_SEL = "." + ACTIVE;
                var COMPLETELY = "fp-completely";
                var COMPLETELY_SEL = "." + COMPLETELY;
                var SECTION_DEFAULT_SEL = ".section";
                var SECTION = "fp-section";
                var SECTION_SEL = "." + SECTION;
                var SECTION_ACTIVE_SEL = SECTION_SEL + ACTIVE_SEL;
                var TABLE_CELL = "fp-tableCell";
                var TABLE_CELL_SEL = "." + TABLE_CELL;
                var AUTO_HEIGHT = "fp-auto-height";
                var AUTO_HEIGHT_SEL = "." + AUTO_HEIGHT;
                var AUTO_HEIGHT_RESPONSIVE = "fp-auto-height-responsive";
                var AUTO_HEIGHT_RESPONSIVE_SEL = "." + AUTO_HEIGHT_RESPONSIVE;
                var NORMAL_SCROLL = "fp-normal-scroll";
                var SECTION_NAV = "fp-nav";
                var SECTION_NAV_SEL = "#" + SECTION_NAV;
                var SECTION_NAV_TOOLTIP = "fp-tooltip";
                var SECTION_NAV_TOOLTIP_SEL = "." + SECTION_NAV_TOOLTIP;
                var SHOW_ACTIVE_TOOLTIP = "fp-show-active";
                var SLIDE_DEFAULT_SEL = ".slide";
                var SLIDE = "fp-slide";
                var SLIDE_SEL = "." + SLIDE;
                var SLIDE_ACTIVE_SEL = SLIDE_SEL + ACTIVE_SEL;
                var SLIDES_WRAPPER = "fp-slides";
                var SLIDES_WRAPPER_SEL = "." + SLIDES_WRAPPER;
                var SLIDES_CONTAINER = "fp-slidesContainer";
                var SLIDES_CONTAINER_SEL = "." + SLIDES_CONTAINER;
                var TABLE = "fp-table";
                var OVERFLOW = "fp-overflow";
                var OVERFLOW_SEL = "." + OVERFLOW;
                var IS_OVERFLOW = "fp-is-overflow";
                var SLIDES_NAV = "fp-slidesNav";
                var SLIDES_NAV_SEL = "." + SLIDES_NAV;
                var SLIDES_NAV_LINK_SEL = SLIDES_NAV_SEL + " a";
                var SLIDES_STYLED_ARROW = "fp-arrow";
                var SLIDES_ARROW = "fp-controlArrow";
                var SLIDES_ARROW_SEL = "." + SLIDES_ARROW;
                var SLIDES_PREV = "fp-prev";
                var SLIDES_PREV_SEL = "." + SLIDES_PREV;
                var SLIDES_ARROW_PREV_SEL = SLIDES_ARROW_SEL + SLIDES_PREV_SEL;
                var SLIDES_NEXT = "fp-next";
                var SLIDES_NEXT_SEL = "." + SLIDES_NEXT;
                var SLIDES_ARROW_NEXT_SEL = SLIDES_ARROW_SEL + SLIDES_NEXT_SEL;
                var defaultOptions = {
                    menu: false,
                    anchors: [],
                    lockAnchors: false,
                    navigation: false,
                    navigationPosition: "right",
                    navigationTooltips: [],
                    showActiveTooltip: false,
                    slidesNavigation: false,
                    slidesNavPosition: "bottom",
                    scrollBar: false,
                    hybrid: false,
                    licenseKey: "",
                    credits: {
                        enabled: true,
                        label: "Made with fullPage.js",
                        position: "right"
                    },
                    css3: true,
                    scrollingSpeed: 700,
                    autoScrolling: true,
                    fitToSection: true,
                    fitToSectionDelay: 600,
                    easing: "easeInOutCubic",
                    easingcss3: "ease",
                    loopBottom: false,
                    loopTop: false,
                    loopHorizontal: true,
                    continuousVertical: false,
                    continuousHorizontal: false,
                    scrollHorizontally: false,
                    interlockedSlides: false,
                    dragAndMove: false,
                    offsetSections: false,
                    resetSliders: false,
                    fadingEffect: false,
                    normalScrollElements: null,
                    scrollOverflow: true,
                    scrollOverflowReset: false,
                    touchSensitivity: 5,
                    touchWrapper: null,
                    bigSectionsDestination: null,
                    keyboardScrolling: true,
                    animateAnchor: true,
                    recordHistory: true,
                    allowCorrectDirection: false,
                    scrollOverflowMacStyle: true,
                    controlArrows: true,
                    controlArrowsHTML: [ '<div class="' + SLIDES_STYLED_ARROW + '"></div>', '<div class="' + SLIDES_STYLED_ARROW + '"></div>' ],
                    controlArrowColor: "#fff",
                    verticalCentered: true,
                    sectionsColor: [],
                    paddingTop: 0,
                    paddingBottom: 0,
                    fixedElements: null,
                    responsive: 0,
                    responsiveWidth: 0,
                    responsiveHeight: 0,
                    responsiveSlides: false,
                    parallax: false,
                    parallaxOptions: {
                        type: "reveal",
                        percentage: 62,
                        property: "translate"
                    },
                    cards: false,
                    cardsOptions: {
                        perspective: 100,
                        fadeContent: true,
                        fadeBackground: true
                    },
                    sectionSelector: SECTION_DEFAULT_SEL,
                    slideSelector: SLIDE_DEFAULT_SEL,
                    afterLoad: null,
                    beforeLeave: null,
                    onLeave: null,
                    afterRender: null,
                    afterResize: null,
                    afterReBuild: null,
                    afterSlideLoad: null,
                    onSlideLeave: null,
                    afterResponsive: null,
                    onScrollOverflow: null,
                    lazyLoading: true,
                    observer: true
                };
                var container = null;
                var g_initialAnchorsInDom = false;
                var originals = deepExtend({}, defaultOptions);
                var g_options = null;
                function getInitialAnchorsInDom() {
                    return g_initialAnchorsInDom;
                }
                function setContainer(value) {
                    container = value;
                }
                function getContainer(value) {
                    return container;
                }
                function getOptions() {
                    return g_options || defaultOptions;
                }
                function setOptions(options) {
                    g_options = deepExtend({}, defaultOptions, options);
                    originals = Object.assign({}, g_options);
                }
                function getOriginals() {
                    return originals;
                }
                function setOption(name, value) {
                    defaultOptions[name] = value;
                }
                function setVariableState(variable, value, type) {
                    g_options[variable] = value;
                    if ("internal" !== type) originals[variable] = value;
                }
                function setOptionsFromDOM() {
                    if (!getOptions().anchors.length) {
                        var anchorsAttribute = "[data-anchor]";
                        var anchors = $(getOptions().sectionSelector.split(",").join(anchorsAttribute + ",") + anchorsAttribute, container);
                        if (anchors.length && anchors.length === $(getOptions().sectionSelector, container).length) {
                            g_initialAnchorsInDom = true;
                            anchors.forEach((function(item) {
                                getOptions().anchors.push(getAttr(item, "data-anchor").toString());
                            }));
                        }
                    }
                    if (!getOptions().navigationTooltips.length) {
                        var tooltipsAttribute = "[data-tooltip]";
                        var tooltips = $(getOptions().sectionSelector.split(",").join(tooltipsAttribute + ",") + tooltipsAttribute, container);
                        if (tooltips.length) tooltips.forEach((function(item) {
                            getOptions().navigationTooltips.push(getAttr(item, "data-tooltip").toString());
                        }));
                    }
                }
                var plainItem = function plainItem(panel) {
                    this.anchor = panel.anchor;
                    this.item = panel.item;
                    this.index = panel.index();
                    this.isLast = this.index === panel.item.parentElement.querySelectorAll(panel.selector).length - 1;
                    this.isFirst = !this.index;
                    this.isActive = panel.isActive;
                };
                var Item = function Item(el, selector) {
                    this.parent = this.parent || null;
                    this.selector = selector;
                    this.anchor = getAttr(el, "data-anchor") || getOptions().anchors[index(el, getOptions().sectionSelector)];
                    this.item = el;
                    this.isVisible = isVisible(el);
                    this.isActive = hasClass(el, ACTIVE);
                    this.hasScroll = hasClass(el, OVERFLOW) || null != $(OVERFLOW_SEL, el)[0];
                    this.isSection = selector === getOptions().sectionSelector;
                    this.container = closest(el, SLIDES_CONTAINER_SEL) || closest(el, WRAPPER_SEL);
                    this.index = function() {
                        return this.siblings().indexOf(this);
                    };
                };
                Item.prototype.siblings = function() {
                    if (this.isSection) if (this.isVisible) return state.sections; else return state.sectionsIncludingHidden;
                    return this.parent ? this.parent.slides : 0;
                };
                Item.prototype.prev = function() {
                    var siblings = this.siblings();
                    var currentIndex = this.isSection ? siblings.indexOf(this) : this.parent.slides.indexOf(this);
                    var prevIndex = currentIndex - 1;
                    if (prevIndex >= 0) return siblings[prevIndex];
                    return null;
                };
                Item.prototype.next = function() {
                    var siblings = this.siblings();
                    var currentIndex = this.isSection ? siblings.indexOf(this) : this.parent.slides.indexOf(this);
                    var nextIndex = currentIndex + 1;
                    if (nextIndex < siblings.length) return siblings[nextIndex];
                    return null;
                };
                Item.prototype["prevPanel"] = function() {
                    return this.prev() || (this.parent ? this.parent.prev() : null);
                };
                Item.prototype["nextPanel"] = function() {
                    return this.next() || (this.parent ? this.parent.next() : null);
                };
                Item.prototype.getSiblings = function() {
                    if (this.isSection) return state.sections;
                    return state.panels;
                };
                function getNodes(panels) {
                    return panels.map((function(panel) {
                        return panel.item;
                    }));
                }
                function getPanelByElement(panels, el) {
                    return panels.find((function(panel) {
                        return panel.item === el;
                    }));
                }
                var Section = function Section(el) {
                    plainItem.call(this, el);
                };
                var Slide = function Slide(el) {
                    plainItem.call(this, el);
                };
                function getSlideOrSection(destiny) {
                    var slide = $(SLIDE_ACTIVE_SEL, destiny);
                    if (slide.length) destiny = slide[0];
                    return destiny;
                }
                function getSlideOrSectionPanel(panel) {
                    if (!panel) return null;
                    return panel.activeSlide ? panel.activeSlide : panel;
                }
                function isFullPageAbove() {
                    return getContainer().getBoundingClientRect().bottom >= 0;
                }
                function getScrollSettings(top) {
                    var options = getOptions();
                    var position;
                    var element;
                    if (options.autoScrolling && !options.scrollBar) {
                        position = -top;
                        element = $(WRAPPER_SEL)[0];
                    } else {
                        position = top;
                        element = window;
                    }
                    return {
                        options: position,
                        element
                    };
                }
                function setScrolling(element, val) {
                    if (!getOptions().autoScrolling || getOptions().scrollBar || element.self != window && hasClass(element, SLIDES_WRAPPER)) if (element.self != window && hasClass(element, SLIDES_WRAPPER)) element.scrollLeft = val; else element.scrollTo(0, val); else element.style.top = val + "px";
                }
                function addAnimation(element) {
                    var transition = "transform " + getOptions().scrollingSpeed + "ms " + getOptions().easingcss3;
                    removeClass(element, NO_TRANSITION);
                    return css(element, {
                        "-webkit-transition": transition,
                        transition
                    });
                }
                function getYmovement(activeSection, destiny) {
                    var fromIndex = activeSection.index();
                    var toIndex = index(destiny, SECTION_SEL);
                    if (fromIndex == toIndex) return "none";
                    if (fromIndex > toIndex) return "up";
                    return "down";
                }
                function removeAnimation(element) {
                    return addClass(element, NO_TRANSITION);
                }
                function getTransforms(translate3d) {
                    return {
                        "-webkit-transform": translate3d,
                        "-moz-transform": translate3d,
                        "-ms-transform": translate3d,
                        transform: translate3d
                    };
                }
                var silentScrollId;
                function transformContainer(translate3d, animated) {
                    if (animated) addAnimation(getContainer()); else removeAnimation(getContainer());
                    clearTimeout(silentScrollId);
                    css(getContainer(), getTransforms(translate3d));
                    FP.test.translate3d = translate3d;
                    silentScrollId = setTimeout((function() {
                        removeClass(getContainer(), NO_TRANSITION);
                    }), 10);
                }
                function silentScroll(top) {
                    var roundedTop = Math.round(top);
                    if (getOptions().css3 && getOptions().autoScrolling && !getOptions().scrollBar) {
                        var translate3d = "translate3d(0px, -" + roundedTop + "px, 0px)";
                        transformContainer(translate3d, false);
                    } else if (getOptions().autoScrolling && !getOptions().scrollBar) {
                        css(getContainer(), {
                            top: -roundedTop + "px"
                        });
                        FP.test.top = -roundedTop + "px";
                    } else {
                        var scrollSettings = getScrollSettings(roundedTop);
                        setScrolling(scrollSettings.element, scrollSettings.options);
                    }
                }
                FP.setScrollingSpeed = setScrollingSpeed;
                function setScrollingSpeed(value, type) {
                    setVariableState("scrollingSpeed", value, type);
                }
                var $body = null;
                var $html = null;
                var $htmlBody = null;
                function setCache() {
                    $body = $("body")[0];
                    $html = $("html")[0];
                    $htmlBody = $("html, body");
                }
                var _g_animateScroll;
                function scrollTo(element, to, duration, callback) {
                    var start = getScrolledPosition(element);
                    var change = to - start;
                    var isCallbackFired = false;
                    var startTime;
                    var wasAnimationActive = state.activeAnimation;
                    setState({
                        activeAnimation: true
                    });
                    if (_g_animateScroll) window.cancelAnimationFrame(_g_animateScroll);
                    _g_animateScroll = function g_animateScroll(timestamp) {
                        if (!startTime) startTime = timestamp;
                        var currentTime = Math.floor(timestamp - startTime);
                        if (state.activeAnimation) {
                            var val = to;
                            if (duration) val = win.fp_easings[getOptions().easing](currentTime, start, change, duration);
                            if (currentTime <= duration) setScrolling(element, val);
                            if (currentTime < duration) window.requestAnimationFrame(_g_animateScroll); else if ("undefined" !== typeof callback && !isCallbackFired) {
                                callback();
                                setState({
                                    activeAnimation: false
                                });
                                isCallbackFired = true;
                            }
                        } else if (!isCallbackFired && !wasAnimationActive) {
                            callback();
                            setState({
                                activeAnimation: false
                            });
                            isCallbackFired = true;
                        }
                    };
                    window.requestAnimationFrame(_g_animateScroll);
                }
                function getScrolledPosition(element) {
                    var position;
                    if (element.self != win && hasClass(element, SLIDES_WRAPPER)) position = element.scrollLeft; else if (!getOptions().autoScrolling || getOptions().scrollBar) position = getScrollTop(); else position = element.offsetTop;
                    return position;
                }
                function nullOrSection(el) {
                    if (el && !el.item) return new Section(new SectionPanel(el));
                    return el ? new Section(el) : null;
                }
                function nullOrSlide(el) {
                    return el ? new Slide(el) : null;
                }
                function fireCallback(eventName, v) {
                    var eventData = getEventData(eventName, v);
                    trigger(getContainer(), eventName, eventData);
                    if (false === getOptions()[eventName].apply(eventData[Object.keys(eventData)[0]], toArray(eventData))) return false;
                    return true;
                }
                function getEventData(eventName, v) {
                    var paramsPerEvent = {
                        afterRender: function afterRender() {
                            return {
                                section: nullOrSection(getState().activeSection),
                                slide: nullOrSlide(getState().activeSection.activeSlide)
                            };
                        },
                        onLeave: function onLeave() {
                            return {
                                origin: nullOrSection(v.items.origin),
                                destination: nullOrSection(v.items.destination),
                                direction: v.direction,
                                trigger: getState().scrollTrigger
                            };
                        },
                        afterLoad: function afterLoad() {
                            return paramsPerEvent.onLeave();
                        },
                        afterSlideLoad: function afterSlideLoad() {
                            return {
                                section: nullOrSection(v.items.section),
                                origin: nullOrSection(v.items.origin),
                                destination: nullOrSection(v.items.destination),
                                direction: v.direction,
                                trigger: getState().scrollTrigger
                            };
                        },
                        onSlideLeave: function onSlideLeave() {
                            return paramsPerEvent.afterSlideLoad();
                        },
                        beforeLeave: function beforeLeave() {
                            return paramsPerEvent.onLeave();
                        },
                        onScrollOverflow: function onScrollOverflow() {
                            return {
                                section: nullOrSection(getState().activeSection),
                                slide: nullOrSlide(getState().activeSection.activeSlide),
                                position: v.position,
                                direction: v.direction
                            };
                        }
                    };
                    return paramsPerEvent[eventName]();
                }
                function playMedia(destiny) {
                    var panel = getSlideOrSection(destiny);
                    $("video, audio", panel).forEach((function(element) {
                        if (element.hasAttribute("data-autoplay") && "function" === typeof element.play) element.play();
                    }));
                    $('iframe[src*="youtube.com/embed/"]', panel).forEach((function(element) {
                        if (element.hasAttribute("data-autoplay")) playYoutube(element);
                        element.onload = function() {
                            if (element.hasAttribute("data-autoplay")) playYoutube(element);
                        };
                    }));
                }
                function playYoutube(element) {
                    element.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', "*");
                }
                function stopMedia(destiny) {
                    var panel = getSlideOrSection(destiny);
                    $("video, audio", panel).forEach((function(element) {
                        if (!element.hasAttribute("data-keepplaying") && "function" === typeof element.pause) element.pause();
                    }));
                    $('iframe[src*="youtube.com/embed/"]', panel).forEach((function(element) {
                        if (/youtube\.com\/embed\//.test(getAttr(element, "src")) && !element.hasAttribute("data-keepplaying")) element.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', "*");
                    }));
                }
                function enableYoutubeAPI() {
                    $('iframe[src*="youtube.com/embed/"]', getContainer()).forEach((function(item) {
                        addURLParam(item, "enablejsapi=1");
                    }));
                }
                function addURLParam(element, newParam) {
                    var originalSrc = getAttr(element, "src");
                    element.setAttribute("src", originalSrc + getUrlParamSign(originalSrc) + newParam);
                }
                function getUrlParamSign(url) {
                    return !/\?/.test(url) ? "?" : "&";
                }
                function lazyLoad(destiny) {
                    if (!getOptions().lazyLoading) return;
                    var panel = getSlideOrSection(destiny);
                    $("img[data-src], img[data-srcset], source[data-src], source[data-srcset], video[data-src], audio[data-src], iframe[data-src]", panel).forEach((function(element) {
                        [ "src", "srcset" ].forEach((function(type) {
                            var attribute = getAttr(element, "data-" + type);
                            if (null != attribute && attribute) {
                                setSrc(element, type);
                                element.addEventListener("load", (function() {}));
                            }
                        }));
                        if (matches(element, "source")) {
                            var elementToPlay = closest(element, "video, audio");
                            if (elementToPlay) {
                                elementToPlay.load();
                                elementToPlay.onloadeddata = function() {};
                            }
                        }
                    }));
                }
                function setBodyClass() {
                    var section = getState().activeSection.item;
                    var slide = getState().activeSection.activeSlide;
                    var sectionAnchor = getAnchor(section);
                    var text = String(sectionAnchor);
                    if (slide) {
                        var slideAnchor = getAnchor(slide.item);
                        text = text + "-" + slideAnchor;
                    }
                    text = text.replace("/", "-").replace("#", "");
                    var classRe = new RegExp("\\b\\s?" + VIEWING_PREFIX + "-[^\\s]+\\b", "g");
                    $body.className = $body.className.replace(classRe, "");
                    addClass($body, VIEWING_PREFIX + "-" + text);
                }
                function getAnchor(element) {
                    if (!element) return null;
                    var anchor = getAttr(element, "data-anchor");
                    var elementIndex = index(element);
                    if (null == anchor) anchor = elementIndex;
                    return anchor;
                }
                function setPageStatus(slideIndex, slideAnchor, anchorLink) {
                    var sectionHash = "";
                    if (getOptions().anchors.length && !getOptions().lockAnchors) if (slideIndex) {
                        if (null != anchorLink) sectionHash = anchorLink;
                        if (null == slideAnchor) slideAnchor = slideIndex;
                        setState({
                            lastScrolledSlide: slideAnchor
                        });
                        setUrlHash(sectionHash + "/" + slideAnchor);
                    } else if (null != slideIndex) {
                        setState({
                            lastScrolledSlide: slideAnchor
                        });
                        setUrlHash(anchorLink);
                    } else setUrlHash(anchorLink);
                    setBodyClass();
                }
                function setUrlHash(url) {
                    if (getOptions().recordHistory) location.hash = url; else if (isTouchDevice || isTouch) win.history.replaceState(void 0, void 0, "#" + url); else {
                        var baseUrl = win.location.href.split("#")[0];
                        win.location.replace(baseUrl + "#" + url);
                    }
                }
                function getBulletLinkName(i, defaultName, item) {
                    var anchor = "Section" === defaultName ? getOptions().anchors[i] : getAttr(item, "data-anchor");
                    return encodeURI(getOptions().navigationTooltips[i] || anchor || defaultName + " " + (i + 1));
                }
                function slideBulletHandler(e) {
                    preventDefault(e);
                    setState({
                        scrollTrigger: "horizontalNav"
                    });
                    var sectionElem = closest(this, SECTION_SEL);
                    var slides = $(SLIDES_WRAPPER_SEL, closest(this, SECTION_SEL))[0];
                    var section = getPanelByElement(getState().sections, sectionElem);
                    var destiny = section.slides[index(closest(this, "li"))];
                    EventEmitter.emit(events.landscapeScroll, {
                        slides,
                        destination: destiny.item
                    });
                }
                function activeSlidesNavigation(slidesNav, slideIndex) {
                    if (getOptions().slidesNavigation && null != slidesNav) {
                        removeClass($(ACTIVE_SEL, slidesNav), ACTIVE);
                        addClass($("a", $("li", slidesNav)[slideIndex]), ACTIVE);
                    }
                }
                function addSlidesNavigation(section) {
                    var sectionElem = section.item;
                    var numSlides = section.slides.length;
                    appendTo(createElementFromHTML('<div class="' + SLIDES_NAV + '"><ul></ul></div>'), sectionElem);
                    var nav = $(SLIDES_NAV_SEL, sectionElem)[0];
                    addClass(nav, "fp-" + getOptions().slidesNavPosition);
                    for (var i = 0; i < numSlides; i++) {
                        var slide = $(SLIDE_SEL, sectionElem)[i];
                        appendTo(createElementFromHTML('<li><a href="#"><span class="fp-sr-only">' + getBulletLinkName(i, "Slide", slide) + "</span><span></span></a></li>"), $("ul", nav)[0]);
                    }
                    css(nav, {
                        "margin-left": "-" + nav.innerWidth / 2 + "px"
                    });
                    var activeSlideIndex = section.activeSlide ? section.activeSlide.index() : 0;
                    addClass($("a", $("li", nav)[activeSlideIndex]), ACTIVE);
                }
                var isScrollAllowed = {};
                isScrollAllowed.m = {
                    up: true,
                    down: true,
                    left: true,
                    right: true
                };
                isScrollAllowed.k = deepExtend({}, isScrollAllowed.m);
                function setIsScrollAllowed(value, direction, type) {
                    if ("all" !== direction) isScrollAllowed[type][direction] = value; else Object.keys(isScrollAllowed[type]).forEach((function(key) {
                        isScrollAllowed[type][key] = value;
                    }));
                }
                function getIsScrollAllowed() {
                    return isScrollAllowed;
                }
                EventEmitter.on(events.onClickOrTouch, onClickOrTouch$2);
                function onClickOrTouch$2(params) {
                    var target = params.target;
                    if (matches(target, SLIDES_ARROW_SEL) || closest(target, SLIDES_ARROW_SEL)) slideArrowHandler.call(target, params);
                }
                function slideArrowHandler() {
                    var section = closest(this, SECTION_SEL);
                    if (hasClass(this, SLIDES_PREV)) {
                        if (getIsScrollAllowed().m.left) {
                            setState({
                                scrollTrigger: "slideArrow"
                            });
                            EventEmitter.emit(events.moveSlideLeft, {
                                section
                            });
                        }
                    } else if (getIsScrollAllowed().m.right) {
                        setState({
                            scrollTrigger: "slideArrow"
                        });
                        EventEmitter.emit(events.moveSlideRight, {
                            section
                        });
                    }
                }
                function createSlideArrows(section) {
                    var sectionElem = section.item;
                    var arrows = [ createElementFromHTML(getOptions().controlArrowsHTML[0]), createElementFromHTML(getOptions().controlArrowsHTML[1]) ];
                    after($(SLIDES_WRAPPER_SEL, sectionElem)[0], arrows);
                    addClass(arrows, SLIDES_ARROW);
                    addClass(arrows[0], SLIDES_PREV);
                    addClass(arrows[1], SLIDES_NEXT);
                    if ("#fff" !== getOptions().controlArrowColor) {
                        css($(SLIDES_ARROW_NEXT_SEL, sectionElem), {
                            "border-color": "transparent transparent transparent " + getOptions().controlArrowColor
                        });
                        css($(SLIDES_ARROW_PREV_SEL, sectionElem), {
                            "border-color": "transparent " + getOptions().controlArrowColor + " transparent transparent"
                        });
                    }
                    if (!getOptions().loopHorizontal) hide($(SLIDES_ARROW_PREV_SEL, sectionElem));
                }
                function toggleControlArrows(v) {
                    if (!getOptions().loopHorizontal && getOptions().controlArrows) {
                        toggle($(SLIDES_ARROW_PREV_SEL, v.section), 0 !== v.slideIndex);
                        toggle($(SLIDES_ARROW_NEXT_SEL, v.section), null != next(v.destiny));
                    }
                }
                var g_afterSlideLoadsId;
                FP.landscapeScroll = landscapeScroll;
                EventEmitter.on(events.bindEvents, bindEvents$b);
                function bindEvents$b() {
                    EventEmitter.on(events.onPerformMovement, onPerformMovement);
                }
                function onPerformMovement() {
                    clearTimeout(g_afterSlideLoadsId);
                    setState({
                        slideMoving: false
                    });
                }
                function landscapeScroll(slides, destiny, direction) {
                    var sectionElem = closest(slides, SECTION_SEL);
                    var section = getState().sections.filter((function(section) {
                        return section.item == sectionElem;
                    }))[0];
                    var slide = section.slides.filter((function(slide) {
                        return slide.item == destiny;
                    }))[0];
                    var v = {
                        slides,
                        destiny,
                        direction,
                        destinyPos: {
                            left: destiny.offsetLeft
                        },
                        slideIndex: slide.index(),
                        section: sectionElem,
                        sectionIndex: section.index(),
                        anchorLink: section.anchor,
                        slidesNav: $(SLIDES_NAV_SEL, sectionElem)[0],
                        slideAnchor: slide.anchor,
                        prevSlide: section.activeSlide.item,
                        prevSlideIndex: section.activeSlide.index(),
                        items: {
                            section,
                            origin: section.activeSlide,
                            destination: slide
                        },
                        localIsResizing: state.isResizing
                    };
                    v.xMovement = getXmovement(v.prevSlideIndex, v.slideIndex);
                    v.direction = v.direction ? v.direction : v.xMovement;
                    if (!v.localIsResizing) setState({
                        canScroll: false
                    });
                    if (getOptions().onSlideLeave) if (!v.localIsResizing && "none" !== v.xMovement) if (isFunction(getOptions().onSlideLeave)) if (false === fireCallback("onSlideLeave", v)) {
                        setState({
                            slideMoving: false
                        });
                        return;
                    }
                    addClass(destiny, ACTIVE);
                    removeClass(siblings(destiny), ACTIVE);
                    updateState();
                    if (!v.localIsResizing) {
                        stopMedia(v.prevSlide);
                        lazyLoad(destiny);
                    }
                    toggleControlArrows(v);
                    if (section.isActive && !v.localIsResizing) setPageStatus(v.slideIndex, v.slideAnchor, v.anchorLink);
                    performHorizontalMove(slides, v, true);
                }
                function performHorizontalMove(slides, v, fireCallback) {
                    var destinyPos = v.destinyPos;
                    activeSlidesNavigation(v.slidesNav, v.slideIndex);
                    setState({
                        scrollX: Math.round(destinyPos.left)
                    });
                    if (getOptions().css3) {
                        var translate3d = "translate3d(-" + Math.round(destinyPos.left) + "px, 0px, 0px)";
                        FP.test.translate3dH[v.sectionIndex] = translate3d;
                        css(addAnimation($(SLIDES_CONTAINER_SEL, slides)), getTransforms(translate3d));
                        clearTimeout(g_afterSlideLoadsId);
                        g_afterSlideLoadsId = setTimeout((function() {
                            if (fireCallback) afterSlideLoads(v);
                        }), getOptions().scrollingSpeed);
                    } else {
                        FP.test.left[v.sectionIndex] = Math.round(destinyPos.left);
                        scrollTo(slides, Math.round(destinyPos.left), getOptions().scrollingSpeed, (function() {
                            if (fireCallback) afterSlideLoads(v);
                        }));
                    }
                }
                function getXmovement(fromIndex, toIndex) {
                    if (fromIndex == toIndex) return "none";
                    if (fromIndex > toIndex) return "left";
                    return "right";
                }
                function onDestroy$7() {
                    clearTimeout(g_afterSlideLoadsId);
                }
                function afterSlideLoads(v) {
                    if (!v.localIsResizing) {
                        if (isFunction(getOptions().afterSlideLoad)) fireCallback("afterSlideLoad", v);
                        setState({
                            canScroll: true
                        });
                        playMedia(v.destiny);
                        EventEmitter.emit(events.afterSlideLoads, v);
                    }
                    setState({
                        slideMoving: false
                    });
                }
                function silentLandscapeScroll(activeSlide, noCallbacks) {
                    setScrollingSpeed(0, "internal");
                    if ("undefined" !== typeof noCallbacks) setState({
                        isResizing: true
                    });
                    landscapeScroll(closest(activeSlide, SLIDES_WRAPPER_SEL), activeSlide);
                    if ("undefined" !== typeof noCallbacks) setState({
                        isResizing: false
                    });
                    setScrollingSpeed(getOriginals().scrollingSpeed, "internal");
                }
                FP.setRecordHistory = setRecordHistory;
                function setRecordHistory(value, type) {
                    setVariableState("recordHistory", value, type);
                }
                FP.setAutoScrolling = setAutoScrolling;
                FP.test.setAutoScrolling = setAutoScrolling;
                function setAutoScrolling(value, type) {
                    if (!value) silentScroll(0);
                    setVariableState("autoScrolling", value, type);
                    var element = getState().activeSection.item;
                    if (getOptions().autoScrolling && !getOptions().scrollBar) {
                        css($htmlBody, {
                            overflow: "hidden",
                            height: "100%"
                        });
                        removeClass($body, "fp-scrollable");
                        setRecordHistory(getOriginals().recordHistory, "internal");
                        css(getContainer(), {
                            "-ms-touch-action": "none",
                            "touch-action": "none"
                        });
                        if (null != element) silentScroll(element.offsetTop);
                    } else {
                        css($htmlBody, {
                            overflow: "visible",
                            height: "initial"
                        });
                        addClass($body, "fp-scrollable");
                        var recordHistory = !getOptions().autoScrolling ? false : getOriginals().recordHistory;
                        setRecordHistory(recordHistory, "internal");
                        css(getContainer(), {
                            "-ms-touch-action": "",
                            "touch-action": ""
                        });
                        if (null != element) {
                            var scrollSettings = getScrollSettings(element.offsetTop);
                            scrollSettings.element.scrollTo(0, scrollSettings.options);
                        }
                    }
                }
                function createInfiniteSections(v) {
                    setState({
                        isDoingContinousVertical: true
                    });
                    var activeSectionItem = getState().activeSection.item;
                    if (!v.isMovementUp) after(activeSectionItem, prevAll(activeSectionItem, SECTION_SEL).reverse()); else before(activeSectionItem, nextAll(activeSectionItem, SECTION_SEL));
                    silentScroll(getState().activeSection.item.offsetTop);
                    keepSlidesPosition$1();
                    v.wrapAroundElements = activeSectionItem;
                    v.dtop = v.element.offsetTop;
                    v.yMovement = getYmovement(getState().activeSection, v.element);
                    return v;
                }
                function keepSlidesPosition$1() {
                    var activeSlides = $(SLIDE_ACTIVE_SEL);
                    for (var i = 0; i < activeSlides.length; i++) silentLandscapeScroll(activeSlides[i], "internal");
                }
                function keepSlidesPosition() {
                    var activeSlides = $(SLIDE_ACTIVE_SEL);
                    for (var i = 0; i < activeSlides.length; i++) silentLandscapeScroll(activeSlides[i], "internal");
                }
                function continuousVerticalFixSectionOrder(v) {
                    if (null == v.wrapAroundElements) return;
                    if (v.isMovementUp) before($(SECTION_SEL)[0], v.wrapAroundElements); else after($(SECTION_SEL)[getState().sections.length - 1], v.wrapAroundElements);
                    silentScroll(getState().activeSection.item.offsetTop);
                    keepSlidesPosition();
                    setState({
                        isDoingContinousVertical: false
                    });
                }
                function lazyLoadOthers() {
                    var hasAutoHeightSections = $(AUTO_HEIGHT_SEL)[0] || isResponsiveMode() && $(AUTO_HEIGHT_RESPONSIVE_SEL)[0];
                    if (!getOptions().lazyLoading || !hasAutoHeightSections) return;
                    $(SECTION_SEL + ":not(" + ACTIVE_SEL + ")").forEach((function(section) {
                        if (isSectionInViewport(section)) lazyLoad(section);
                    }));
                }
                function isSectionInViewport(el) {
                    var rect = el.getBoundingClientRect();
                    var top = rect.top;
                    var bottom = rect.bottom;
                    var pixelOffset = 2;
                    var isTopInView = top + pixelOffset < state.windowsHeight && top > 0;
                    var isBottomInView = bottom > pixelOffset && bottom < state.windowsHeight;
                    return isTopInView || isBottomInView;
                }
                function tooltipTextHandler() {
                    trigger(prev(this), "click");
                }
                function activateNavDots(name, sectionIndex) {
                    var nav = $(SECTION_NAV_SEL)[0];
                    if (getOptions().navigation && null != nav && "none" !== nav.style.display) {
                        removeClass($(ACTIVE_SEL, nav), ACTIVE);
                        if (name) addClass($('a[href="#' + name + '"]', nav), ACTIVE); else addClass($("a", $("li", nav)[sectionIndex]), ACTIVE);
                    }
                }
                function addVerticalNavigation() {
                    remove($(SECTION_NAV_SEL));
                    var navigation = doc.createElement("div");
                    navigation.setAttribute("id", SECTION_NAV);
                    var divUl = doc.createElement("ul");
                    navigation.appendChild(divUl);
                    appendTo(navigation, $body);
                    var nav = $(SECTION_NAV_SEL)[0];
                    addClass(nav, "fp-" + getOptions().navigationPosition);
                    if (getOptions().showActiveTooltip) addClass(nav, SHOW_ACTIVE_TOOLTIP);
                    var li = "";
                    for (var i = 0; i < getState().sections.length; i++) {
                        var section = getState().sections[i];
                        var link = "";
                        if (getOptions().anchors.length) link = section.anchor;
                        li += '<li><a href="#' + encodeURI(link) + '"><span class="fp-sr-only">' + getBulletLinkName(section.index(), "Section") + "</span><span></span></a>";
                        var tooltip = getOptions().navigationTooltips[section.index()];
                        if ("undefined" !== typeof tooltip && "" !== tooltip) li += '<div class="' + SECTION_NAV_TOOLTIP + " fp-" + getOptions().navigationPosition + '">' + tooltip + "</div>";
                        li += "</li>";
                    }
                    $("ul", nav)[0].innerHTML = li;
                    var bullet = $("li", $(SECTION_NAV_SEL)[0])[getState().activeSection.index()];
                    addClass($("a", bullet), ACTIVE);
                }
                function sectionBulletHandler(e) {
                    if (e.preventDefault) preventDefault(e);
                    setState({
                        scrollTrigger: "verticalNav"
                    });
                    var indexBullet = index(closest(this, SECTION_NAV_SEL + " li"));
                    EventEmitter.emit(events.scrollPage, {
                        destination: getState().sections[indexBullet]
                    });
                }
                function activateMenuAndNav(anchor, index) {
                    activateMenuElement(anchor);
                    activateNavDots(anchor, index);
                }
                function activateMenuElement(name) {
                    if (getOptions().menu && getOptions().menu.length) $(getOptions().menu).forEach((function(menu) {
                        if (null != menu) {
                            removeClass($(ACTIVE_SEL, menu), ACTIVE);
                            addClass($('[data-menuanchor="' + name + '"]', menu), ACTIVE);
                        }
                    }));
                }
                (new Date).getTime();
                var oncePerScroll = function() {
                    var canTriggerEvent = true;
                    var prevWheelTime = (new Date).getTime();
                    var result;
                    var isScrollingOnInit = !win.fullpage_api;
                    return function(scrollTrigger, callback) {
                        var currentTime = (new Date).getTime();
                        var timeThreshold = "wheel" === scrollTrigger ? getOptions().scrollingSpeed : 100;
                        canTriggerEvent = isScrollingOnInit || currentTime - prevWheelTime >= timeThreshold;
                        isScrollingOnInit = !win.fullpage_api;
                        if (canTriggerEvent) {
                            result = callback();
                            prevWheelTime = currentTime;
                        }
                        return "undefined" !== typeof result ? result : true;
                    };
                }();
                function fireCallbackOncePerScroll(callbackName, params) {
                    if (!isFunction(getOptions().beforeLeave)) return;
                    var result = oncePerScroll(getState().scrollTrigger, (function() {
                        return fireCallback(callbackName, params);
                    }));
                    return result;
                }
                FP.moveTo = moveTo;
                FP.getScrollY = function() {
                    return state.scrollY;
                };
                var g_afterSectionLoadsId;
                var g_transitionLapseId;
                EventEmitter.on(events.onDestroy, onDestroy$6);
                function scrollPage(section, callback, isMovementUp) {
                    var element = section.item;
                    if (null == element) return;
                    var dtop = getDestinationPosition(element);
                    var slideAnchorLink;
                    var slideIndex;
                    var v = {
                        element,
                        callback,
                        isMovementUp,
                        dtop,
                        yMovement: getYmovement(getState().activeSection, element),
                        anchorLink: section.anchor,
                        sectionIndex: section.index(),
                        activeSlide: section.activeSlide ? section.activeSlide.item : null,
                        leavingSection: getState().activeSection.index() + 1,
                        localIsResizing: state.isResizing,
                        items: {
                            origin: getState().activeSection,
                            destination: section
                        },
                        direction: null
                    };
                    if (getState().activeSection.item == element && !state.isResizing || getOptions().scrollBar && getScrollTop() === v.dtop && !hasClass(element, AUTO_HEIGHT)) return;
                    if (null != v.activeSlide) {
                        slideAnchorLink = getAttr(v.activeSlide, "data-anchor");
                        slideIndex = index(v.activeSlide, null);
                    }
                    if (!v.localIsResizing) {
                        var direction = v.yMovement;
                        if ("undefined" !== typeof isMovementUp) direction = isMovementUp ? "up" : "down";
                        v.direction = direction;
                        if (isFunction(getOptions().beforeLeave)) if (false === fireCallbackOncePerScroll("beforeLeave", v)) return;
                        if (isFunction(getOptions().onLeave)) if (!fireCallback("onLeave", v)) return;
                    }
                    if (getOptions().autoScrolling && getOptions().continuousVertical && "undefined" !== typeof v.isMovementUp && (!v.isMovementUp && "up" == v.yMovement || v.isMovementUp && "down" == v.yMovement)) v = createInfiniteSections(v);
                    if (!v.localIsResizing) stopMedia(getState().activeSection.item);
                    addClass(element, ACTIVE);
                    removeClass(siblings(element), ACTIVE);
                    updateState();
                    lazyLoad(element);
                    setState({
                        canScroll: FP.test.isTesting
                    });
                    setPageStatus(slideIndex, slideAnchorLink, v.anchorLink);
                    performMovement(v);
                    setState({
                        lastScrolledDestiny: v.anchorLink
                    });
                    activateMenuAndNav(v.anchorLink, v.sectionIndex);
                }
                function onDestroy$6() {
                    clearTimeout(g_afterSectionLoadsId);
                    clearTimeout(g_transitionLapseId);
                }
                function getDestinationPosition(element) {
                    var elementHeight = element.offsetHeight;
                    var elementTop = element.offsetTop;
                    var position = elementTop;
                    var isScrollingDown = elementTop > state.previousDestTop;
                    var sectionBottom = position - getWindowHeight() + elementHeight;
                    var bigSectionsDestination = getOptions().bigSectionsDestination;
                    if (elementHeight > getWindowHeight()) {
                        if (!isScrollingDown && !bigSectionsDestination || "bottom" === bigSectionsDestination) position = sectionBottom;
                    } else if (isScrollingDown || state.isResizing && null == next(element)) position = sectionBottom;
                    setState({
                        previousDestTop: position
                    });
                    return position;
                }
                function performMovement(v) {
                    var isFastSpeed = getOptions().scrollingSpeed < 700;
                    var transitionLapse = isFastSpeed ? 700 : getOptions().scrollingSpeed;
                    setState({
                        touchDirection: "none",
                        scrollY: Math.round(v.dtop)
                    });
                    EventEmitter.emit(events.onPerformMovement);
                    if (getOptions().css3 && getOptions().autoScrolling && !getOptions().scrollBar) {
                        var translate3d = "translate3d(0px, -" + Math.round(v.dtop) + "px, 0px)";
                        transformContainer(translate3d, true);
                        if (getOptions().scrollingSpeed) {
                            clearTimeout(g_afterSectionLoadsId);
                            g_afterSectionLoadsId = setTimeout((function() {
                                afterSectionLoads$1(v);
                                setState({
                                    canScroll: !isFastSpeed || FP.test.isTesting
                                });
                            }), getOptions().scrollingSpeed);
                        } else afterSectionLoads$1(v);
                    } else {
                        var scrollSettings = getScrollSettings(v.dtop);
                        FP.test.top = -v.dtop + "px";
                        clearTimeout(g_afterSectionLoadsId);
                        scrollTo(scrollSettings.element, scrollSettings.options, getOptions().scrollingSpeed, (function() {
                            if (getOptions().scrollBar) g_afterSectionLoadsId = setTimeout((function() {
                                afterSectionLoads$1(v);
                            }), 30); else {
                                afterSectionLoads$1(v);
                                setState({
                                    canScroll: !isFastSpeed || FP.test.isTesting
                                });
                            }
                        }));
                    }
                    if (isFastSpeed) {
                        clearTimeout(g_transitionLapseId);
                        g_transitionLapseId = setTimeout((function() {
                            setState({
                                canScroll: true
                            });
                        }), transitionLapse);
                    }
                }
                function afterSectionLoads$1(v) {
                    setState({
                        isBeyondFullpage: false
                    });
                    continuousVerticalFixSectionOrder(v);
                    if (isFunction(getOptions().afterLoad) && !v.localIsResizing) fireCallback("afterLoad", v);
                    updateState();
                    if (!v.localIsResizing) playMedia(v.element);
                    addClass(v.element, COMPLETELY);
                    removeClass(siblings(v.element), COMPLETELY);
                    lazyLoadOthers();
                    scrollOverflowHandler.afterSectionLoads();
                    setState({
                        canScroll: true
                    });
                    EventEmitter.emit(events.afterSectionLoads, v);
                    if (isFunction(v.callback)) v.callback();
                }
                FP.setFitToSection = setFitToSection;
                FP.fitToSection = fitToSection;
                function setFitToSection(value, type) {
                    setVariableState("fitToSection", value, type);
                }
                function fitToSection() {
                    if (state.canScroll) {
                        setState({
                            isResizing: true
                        });
                        scrollPage(state.activeSection);
                        setState({
                            isResizing: false
                        });
                    }
                }
                FP.setResponsive = setResponsive;
                function responsive() {
                    var widthLimit = getOptions().responsive || getOptions().responsiveWidth;
                    var heightLimit = getOptions().responsiveHeight;
                    var isBreakingPointWidth = widthLimit && win.innerWidth < widthLimit;
                    var isBreakingPointHeight = heightLimit && win.innerHeight < heightLimit;
                    if (widthLimit && heightLimit) setResponsive(isBreakingPointWidth || isBreakingPointHeight); else if (widthLimit) setResponsive(isBreakingPointWidth); else if (heightLimit) setResponsive(isBreakingPointHeight);
                }
                function setResponsive(active) {
                    var isResponsive = isResponsiveMode();
                    if (active) {
                        if (!isResponsive) {
                            setAutoScrolling(false, "internal");
                            setFitToSection(false, "internal");
                            hide($(SECTION_NAV_SEL));
                            addClass($body, RESPONSIVE);
                            if (isFunction(getOptions().afterResponsive)) getOptions().afterResponsive.call(getContainer(), active);
                        }
                    } else if (isResponsive) {
                        setAutoScrolling(getOriginals().autoScrolling, "internal");
                        setFitToSection(getOriginals().autoScrolling, "internal");
                        show($(SECTION_NAV_SEL));
                        removeClass($body, RESPONSIVE);
                        if (isFunction(getOptions().afterResponsive)) getOptions().afterResponsive.call(getContainer(), active);
                    }
                }
                function isResponsiveMode() {
                    return hasClass($body, RESPONSIVE);
                }
                function addTableClass(element) {
                    if (!getOptions().verticalCentered) return;
                    if (!getOptions().scrollOverflow && scrollOverflowHandler.shouldBeScrollable(element.item)) return;
                    if (!scrollOverflowHandler.isScrollable(element)) if (!hasClass(element.item, TABLE)) addClass(element.item, TABLE);
                }
                var startingSection = null;
                FP.getActiveSection = getActiveSection;
                function getStartingSection() {
                    return startingSection;
                }
                function styleSection(section) {
                    var sectionElem = section.item;
                    var hasSlides = section.allSlidesItems.length;
                    var index = section.index();
                    if (!getState().activeSection && section.isVisible) {
                        addClass(sectionElem, ACTIVE);
                        updateState();
                    }
                    startingSection = getState().activeSection.item;
                    if (getOptions().paddingTop) css(sectionElem, {
                        "padding-top": getOptions().paddingTop
                    });
                    if (getOptions().paddingBottom) css(sectionElem, {
                        "padding-bottom": getOptions().paddingBottom
                    });
                    if ("undefined" !== typeof getOptions().sectionsColor[index]) css(sectionElem, {
                        "background-color": getOptions().sectionsColor[index]
                    });
                    if ("undefined" !== typeof getOptions().anchors[index]) sectionElem.setAttribute("data-anchor", section.anchor);
                    if (!hasSlides) addTableClass(section);
                }
                function getActiveSection() {
                    return getState().activeSection;
                }
                function getSectionFromPanel(panel) {
                    return panel.isSection ? panel : panel.parent;
                }
                EventEmitter.on(events.bindEvents, bindEvents$a);
                function bindEvents$a() {
                    EventEmitter.on(events.onAfterRenderNoAnchor, afterRender);
                    EventEmitter.on(events.afterSlideLoads, scrollOverflowHandler.afterSectionLoads);
                }
                function afterRender() {
                    if (getOptions().scrollOverflow && !getOptions().scrollBar) {
                        scrollOverflowHandler.makeScrollable();
                        scrollOverflowHandler.afterSectionLoads();
                    }
                }
                var scrollOverflowHandler = {
                    focusedElem: null,
                    timeBeforeReachingLimit: null,
                    timeLastScroll: null,
                    preventScrollWhileMoving: function preventScrollWhileMoving(e) {
                        if (!state.canScroll) {
                            preventDefault(e);
                            return false;
                        }
                    },
                    afterSectionLoads: function afterSectionLoads() {
                        if (!getOptions().scrollOverflow) return;
                        if (doc.activeElement === this.focusedElem) this.focusedElem.blur();
                        var scrollableItem = scrollOverflowHandler.getScrollableItem(getState().activeSection.item);
                        if (scrollableItem && !isTouchDevice && !isTouch) {
                            this.focusedElem = scrollableItem;
                            requestAnimationFrame((function() {
                                scrollableItem.focus();
                            }));
                        }
                    },
                    makeScrollable: function makeScrollable() {
                        if (getOptions().scrollOverflowMacStyle && !isMacDevice) addClass($body, "fp-scroll-mac");
                        getState().panels.forEach((function(el) {
                            if (el.slides && el.slides.length) return;
                            if (hasClass(el.item, AUTO_HEIGHT_RESPONSIVE) && isResponsiveMode()) return; else {
                                var item = getSlideOrSection(el.item);
                                var shouldBeScrollable = scrollOverflowHandler.shouldBeScrollable(el.item);
                                var section = getSectionFromPanel(el);
                                if (isIE11) {
                                    var toggleAction = shouldBeScrollable ? "addClass" : "removeClass";
                                    utils[toggleAction](section.item, IS_OVERFLOW);
                                    utils[toggleAction](el.item, IS_OVERFLOW);
                                } else {
                                    addClass(section.item, IS_OVERFLOW);
                                    addClass(el.item, IS_OVERFLOW);
                                }
                                if (!el.hasScroll) {
                                    scrollOverflowHandler.createWrapper(item);
                                    scrollOverflowHandler.bindEvents(item);
                                }
                                el.hasScroll = true;
                            }
                        }));
                    },
                    bindEvents: function bindEvents(item) {
                        scrollOverflowHandler.getScrollableItem(item).addEventListener("scroll", scrollOverflowHandler.onPanelScroll);
                        item.addEventListener("wheel", scrollOverflowHandler.preventScrollWhileMoving, {
                            passive: false
                        });
                        item.addEventListener("keydown", scrollOverflowHandler.preventScrollWhileMoving, {
                            passive: false
                        });
                    },
                    createWrapper: function createWrapper(item) {
                        var overflowWrapper = document.createElement("div");
                        overflowWrapper.className = OVERFLOW;
                        wrapInner(item, overflowWrapper);
                        overflowWrapper.setAttribute("tabindex", "-1");
                    },
                    destroyWrapper: function destroyWrapper(item) {
                        var overflowWrapper = $(OVERFLOW_SEL, item)[0];
                        if (overflowWrapper) {
                            unwrap(overflowWrapper);
                            item.removeAttribute("tabindex");
                        }
                    },
                    getScrollableItem: function getScrollableItem(sectionItem) {
                        var panel = getSlideOrSection(sectionItem);
                        return $(OVERFLOW_SEL, panel)[0] || panel;
                    },
                    hasScroll: function hasScroll(panelItem) {
                        return hasClass(panelItem, OVERFLOW) || null != $(OVERFLOW_SEL, panelItem)[0];
                    },
                    isScrollable: function isScrollable(panel) {
                        return panel.isSection && panel.activeSlide ? panel.activeSlide.hasScroll : panel.hasScroll;
                    },
                    shouldBeScrollable: function shouldBeScrollable(item) {
                        var scrollable = scrollOverflowHandler.getScrollableItem(item);
                        return scrollable.scrollHeight > win.innerHeight;
                    },
                    isScrolled: function isScrolled(direction, el) {
                        if (!state.canScroll) return false;
                        if (getOptions().scrollBar) return true;
                        var scrollableItem = scrollOverflowHandler.getScrollableItem(el);
                        if (!getOptions().scrollOverflow || !hasClass(scrollableItem, OVERFLOW) || hasClass(getSlideOrSection(el), "fp-noscroll")) return true;
                        var ie11offset = isIE11 ? 1 : 0;
                        var positionY = scrollableItem.scrollTop;
                        var isTopReached = "up" === direction && positionY <= 0;
                        var isBottomReached = "down" === direction && scrollableItem.scrollHeight <= Math.ceil(scrollableItem.offsetHeight + positionY) + ie11offset;
                        var isScrolled = isTopReached || isBottomReached;
                        if (!isScrolled) this.timeBeforeReachingLimit = (new Date).getTime();
                        return isScrolled;
                    },
                    shouldMovePage: function shouldMovePage() {
                        this.timeLastScroll = (new Date).getTime();
                        var timeDiff = this.timeLastScroll - scrollOverflowHandler.timeBeforeReachingLimit;
                        var isUsingTouch = isTouchDevice || isTouch;
                        var isGrabbing = isUsingTouch && state.isGrabbing;
                        var isNotFirstTimeReachingLimit = state.isUsingWheel && timeDiff > 600;
                        return isGrabbing && timeDiff > 400 || isNotFirstTimeReachingLimit;
                    },
                    onPanelScroll: function() {
                        var prevPosition = 0;
                        return function(e) {
                            var currentPosition = e.target.scrollTop;
                            var direction = "none" !== state.touchDirection ? state.touchDirection : prevPosition < currentPosition ? "down" : "up";
                            prevPosition = currentPosition;
                            if (isFunction(getOptions().onScrollOverflow)) fireCallback("onScrollOverflow", {
                                position: currentPosition,
                                direction
                            });
                            if (hasClass(e.target, OVERFLOW) && state.canScroll) if (scrollOverflowHandler.isScrolled(direction, e.target) && scrollOverflowHandler.shouldMovePage()) if (scrollOverflowHandler.shouldBeScrollable(getState().activeSection.item)) EventEmitter.emit(events.onScrollOverflowScrolled, {
                                direction
                            });
                        };
                    }()
                };
                var g_prevActiveSectionIndex = null;
                var g_prevActiveSlideIndex = null;
                function updateState() {
                    state.activeSection = null;
                    state.sections.map((function(section) {
                        var isActive = hasClass(section.item, ACTIVE);
                        section.isActive = isActive;
                        section.hasScroll = scrollOverflowHandler.hasScroll(section.item);
                        if (isActive) state.activeSection = section;
                        if (section.slides.length) {
                            section.activeSlide = null;
                            section.slides.map((function(slide) {
                                var isActiveSlide = hasClass(slide.item, ACTIVE);
                                slide.hasScroll = scrollOverflowHandler.hasScroll(section.item);
                                slide.isActive = isActiveSlide;
                                if (isActiveSlide) section.activeSlide = slide;
                            }));
                        }
                    }));
                    scrollToNewActivePanel();
                }
                function updateStructuralState() {
                    var allSectionItems = $(getOptions().sectionSelector, getContainer());
                    var sectionsItems = getVisible(allSectionItems);
                    var allSections = Array.from(allSectionItems).map((function(item) {
                        return new SectionPanel(item);
                    }));
                    var sections = allSections.filter((function(item) {
                        return item.isVisible;
                    }));
                    var slides = sections.reduce((function(acc, section) {
                        return acc.concat(section.slides);
                    }), []);
                    g_prevActiveSectionIndex = getPrevActivePanelIndex(state.activeSection);
                    g_prevActiveSlideIndex = getPrevActivePanelIndex(state.activeSection ? state.activeSection.activeSlide : null);
                    state.numSections = sectionsItems.length;
                    state.numSlides = sections.reduce((function(acc, section) {
                        return acc + section.slides.length;
                    }), 0);
                    state.sections = sections;
                    state.sectionsIncludingHidden = allSections;
                    state.slides = slides;
                    state.panels = state.sections.concat(state.slides);
                }
                function getPrevActivePanelIndex(activePanel) {
                    if (!activePanel) return null;
                    var prevActivePanelItem = activePanel ? activePanel.item : null;
                    var hiddenPanels = activePanel.isSection ? state.sectionsIncludingHidden : state.activeSection.slidesIncludingHidden;
                    if (prevActivePanelItem) {
                        var panel = getPanelByElement(hiddenPanels, prevActivePanelItem);
                        return panel ? panel.index() : null;
                    }
                    return null;
                }
                function scrollToNewActivePanel() {
                    var activeSection = state.activeSection;
                    var activeSectionHasSlides = state.activeSection ? state.activeSection.slides.length : false;
                    var activeSlide = state.activeSection ? state.activeSection.activeSlide : null;
                    if (!activeSection && state.sections.length && !getState().isBeyondFullpage && g_prevActiveSectionIndex) {
                        var newActiveSection = getNewActivePanel(g_prevActiveSectionIndex, state.sections);
                        if (newActiveSection) {
                            state.activeSection = newActiveSection;
                            state.activeSection.isActive = true;
                            addClass(state.activeSection.item, ACTIVE);
                        }
                        if (state.activeSection) silentScroll(state.activeSection.item.offsetTop);
                    }
                    if (activeSectionHasSlides && !activeSlide && g_prevActiveSlideIndex) {
                        var newActiveSlide = getNewActivePanel(g_prevActiveSlideIndex, state.activeSection.slides);
                        if (newActiveSlide) {
                            state.activeSection.activeSlide = newActiveSlide;
                            state.activeSection.activeSlide.isActive = true;
                            addClass(state.activeSection.activeSlide.item, ACTIVE);
                        }
                        if (state.activeSection.activeSlide) silentLandscapeScroll(state.activeSection.activeSlide.item, "internal");
                    }
                }
                function getNewActivePanel(prevActivePanelIndex, siblings) {
                    var newActiveSection;
                    var prevIndex = prevActivePanelIndex - 1;
                    var nextIndex = prevActivePanelIndex;
                    do {
                        newActiveSection = siblings[prevIndex] || siblings[nextIndex];
                        if (newActiveSection) break;
                        prevIndex -= 1;
                        nextIndex += 1;
                    } while (prevIndex >= 0 || nextIndex < siblings.length);
                    return newActiveSection;
                }
                var SectionPanel = function SectionPanel(el) {
                    var _this = this;
                    [].push.call(arguments, getOptions().sectionSelector);
                    Item.apply(this, arguments);
                    this.allSlidesItems = $(getOptions().slideSelector, el);
                    this.slidesIncludingHidden = Array.from(this.allSlidesItems).map((function(item) {
                        return new SlidePanel(item, _this);
                    }));
                    this.slides = this.slidesIncludingHidden.filter((function(slidePanel) {
                        return slidePanel.isVisible;
                    }));
                    this.activeSlide = this.slides.length ? this.slides.filter((function(slide) {
                        return slide.isActive;
                    }))[0] || this.slides[0] : null;
                };
                SectionPanel.prototype = Item.prototype;
                SectionPanel.prototype.constructor = SectionPanel;
                var SlidePanel = function SlidePanel(el, section) {
                    this.parent = section;
                    Item.call(this, el, getOptions().slideSelector);
                };
                SlidePanel.prototype = Item.prototype;
                SlidePanel.prototype.constructor = SectionPanel;
                function addInternalSelectors() {
                    addClass($(getOptions().sectionSelector, getContainer()), SECTION);
                    addClass($(getOptions().slideSelector, getContainer()), SLIDE);
                }
                function styleSlides(section) {
                    var numSlides = section.slides.length;
                    var slidesElems = section.allSlidesItems;
                    var slides = section.slides;
                    var sliderWidth = 100 * numSlides;
                    var slideWidth = 100 / numSlides;
                    if (!$(SLIDES_WRAPPER_SEL, section.item)[0]) {
                        var slidesWrapper = doc.createElement("div");
                        slidesWrapper.className = SLIDES_WRAPPER;
                        wrapAll(slidesElems, slidesWrapper);
                        var slidesContainer = doc.createElement("div");
                        slidesContainer.className = SLIDES_CONTAINER;
                        wrapAll(slidesElems, slidesContainer);
                    }
                    css($(SLIDES_CONTAINER_SEL, section.item), {
                        width: sliderWidth + "%"
                    });
                    if (numSlides > 1) {
                        if (getOptions().controlArrows) createSlideArrows(section);
                        if (getOptions().slidesNavigation) addSlidesNavigation(section);
                    }
                    slides.forEach((function(slide) {
                        css(slide.item, {
                            width: slideWidth + "%"
                        });
                        if (getOptions().verticalCentered) addTableClass(slide);
                    }));
                    var startingSlide = section.activeSlide || null;
                    if (null != startingSlide && state.activeSection && (0 !== state.activeSection.index() || 0 === state.activeSection.index() && 0 !== startingSlide.index())) silentLandscapeScroll(startingSlide.item, "internal"); else addClass(slidesElems[0], ACTIVE);
                }
                var g_wrapperObserver;
                var g_wrapperObserveConfig = {
                    attributes: false,
                    subtree: true,
                    childList: true,
                    characterData: true
                };
                EventEmitter.on(events.bindEvents, bindEvents$9);
                FP["render"] = onContentChange;
                function bindEvents$9() {
                    if (getOptions().observer && "MutationObserver" in window && $(WRAPPER_SEL)[0]) g_wrapperObserver = createObserver($(WRAPPER_SEL)[0], onContentChange, g_wrapperObserveConfig);
                    EventEmitter.on(events.contentChanged, onContentChange);
                }
                function createObserver(target, callback, config) {
                    var observer = new MutationObserver(callback);
                    observer.observe(target, config);
                    return observer;
                }
                function didSlidesChange() {
                    return getVisible($(getOptions().slideSelector, getContainer())).length !== getState().numSlides;
                }
                function didSectionsChange() {
                    return getVisible($(getOptions().sectionSelector, getContainer())).length !== getState().numSections;
                }
                function didSectionsOrSlidesChange() {
                    return didSlidesChange() || didSectionsChange();
                }
                function onContentChange(mutations) {
                    var _didSlidesChange = didSlidesChange();
                    if (didSectionsOrSlidesChange() && !state.isDoingContinousVertical) {
                        if (getOptions().observer && g_wrapperObserver) g_wrapperObserver.disconnect();
                        updateStructuralState();
                        updateState();
                        getOptions().anchors = [];
                        remove($(SECTION_NAV_SEL));
                        addInternalSelectors();
                        setOptionsFromDOM();
                        if (getOptions().navigation) addVerticalNavigation();
                        if (_didSlidesChange) {
                            remove($(SLIDES_NAV_SEL));
                            remove($(SLIDES_ARROW_SEL));
                        }
                        getState().sections.forEach((function(section) {
                            if (section.slides.length) {
                                if (_didSlidesChange) styleSlides(section);
                            } else styleSection(section);
                        }));
                    }
                    if (getOptions().observer && g_wrapperObserver && $(WRAPPER_SEL)[0]) g_wrapperObserver.observe($(WRAPPER_SEL)[0], g_wrapperObserveConfig);
                }
                var supportsPassiveEvents = function() {
                    var g_supportsPassive = false;
                    try {
                        var opts = Object.defineProperty({}, "passive", {
                            get: function get() {
                                g_supportsPassive = true;
                            }
                        });
                        windowAddEvent("testPassive", null, opts);
                        windowRemoveEvent("testPassive", null, opts);
                    } catch (e) {}
                    return function() {
                        return g_supportsPassive;
                    };
                }();
                function getPassiveOptionsIfPossible() {
                    return supportsPassiveEvents() ? {
                        passive: false
                    } : false;
                }
                var wheelDataHandler = function() {
                    var _prevTime = (new Date).getTime();
                    var _scrollings = [];
                    var isScrollingVertically;
                    var direction;
                    return {
                        registerEvent: function registerEvent(e) {
                            e = e || win.event;
                            var value = e.wheelDelta || -e.deltaY || -e.detail;
                            var delta = Math.max(-1, Math.min(1, value));
                            var horizontalDetection = "undefined" !== typeof e.wheelDeltaX || "undefined" !== typeof e.deltaX;
                            isScrollingVertically = Math.abs(e.wheelDeltaX) < Math.abs(e.wheelDelta) || Math.abs(e.deltaX) < Math.abs(e.deltaY) || !horizontalDetection;
                            var curTime = (new Date).getTime();
                            direction = delta < 0 ? "down" : "up";
                            if (_scrollings.length > 149) _scrollings.shift();
                            _scrollings.push(Math.abs(value));
                            var timeDiff = curTime - _prevTime;
                            _prevTime = curTime;
                            if (timeDiff > 200) _scrollings = [];
                        },
                        isAccelerating: function isAccelerating() {
                            var averageEnd = getAverage(_scrollings, 10);
                            var averageMiddle = getAverage(_scrollings, 70);
                            var isAccelerating = averageEnd >= averageMiddle;
                            return _scrollings.length ? isAccelerating && isScrollingVertically : false;
                        },
                        getDirection: function getDirection() {
                            return direction;
                        }
                    };
                }();
                function scrollBeyondFullPage() {
                    var dtop = getDestinationOffset();
                    var scrollSettings = getScrollSettings(dtop);
                    FP.test.top = -dtop + "px";
                    setState({
                        canScroll: false
                    });
                    scrollTo(scrollSettings.element, scrollSettings.options, getOptions().scrollingSpeed, (function() {
                        setTimeout((function() {
                            setState({
                                isBeyondFullpage: true
                            });
                            setState({
                                canScroll: true
                            });
                        }), 30);
                    }));
                }
                function onKeyDown() {
                    if (!isFullPageAbove()) return; else scrollUpToFullpage();
                }
                function scrollUpToFullpage() {
                    var scrollSettings = getScrollSettings(getLast(getState().sections).item.offsetTop);
                    setState({
                        canScroll: false
                    });
                    scrollTo(scrollSettings.element, scrollSettings.options, getOptions().scrollingSpeed, (function() {
                        setState({
                            canScroll: true
                        });
                        setState({
                            isBeyondFullpage: false
                        });
                        setState({
                            isAboutToScrollToFullPage: false
                        });
                    }));
                }
                function getDestinationOffset() {
                    if (!getOptions().css3) return getLast(getState().sections).item.offsetTop + getLast(getState().sections).item.offsetHeight;
                    return getScrollTop() + getWindowHeight();
                }
                function beyondFullPageHandler(container, e) {
                    (new Date).getTime();
                    var pauseScroll = getState().isBeyondFullpage && container.getBoundingClientRect().bottom >= 0 && "up" === wheelDataHandler.getDirection();
                    var g_isAboutToScrollToFullPage = getState().isAboutToScrollToFullPage;
                    if (g_isAboutToScrollToFullPage) {
                        preventDefault(e);
                        return false;
                    }
                    if (getState().isBeyondFullpage) {
                        if (!pauseScroll) keyframeTime("set", "beyondFullpage", 1e3); else {
                            var shouldSetFixedPosition = !g_isAboutToScrollToFullPage && (!keyframeTime("isNewKeyframe", "beyondFullpage") || !wheelDataHandler.isAccelerating());
                            var scrollSettings;
                            if (shouldSetFixedPosition) {
                                scrollSettings = getScrollSettings(getLast(getState().sections).item.offsetTop + getLast(getState().sections).item.offsetHeight);
                                scrollSettings.element.scrollTo(0, scrollSettings.options);
                                setState({
                                    isAboutToScrollToFullPage: false
                                });
                                preventDefault(e);
                                return false;
                            } else if (wheelDataHandler.isAccelerating()) {
                                pauseScroll = false;
                                setState({
                                    isAboutToScrollToFullPage: true
                                });
                                setState({
                                    scrollTrigger: "wheel"
                                });
                                scrollUpToFullpage();
                                preventDefault(e);
                                return false;
                            }
                        }
                        if (!g_isAboutToScrollToFullPage) if (!pauseScroll) return true;
                    }
                }
                var keyframeTime = function() {
                    var isNew = false;
                    var frames = {};
                    var timeframes = {};
                    return function(action, name, timeframe) {
                        switch (action) {
                          case "set":
                            frames[name] = (new Date).getTime();
                            timeframes[name] = timeframe;
                            break;

                          case "isNewKeyframe":
                            var current = (new Date).getTime();
                            isNew = current - frames[name] > timeframes[name];
                            break;
                        }
                        return isNew;
                    };
                }();
                FP.moveSectionDown = moveSectionDown;
                function moveSectionDown() {
                    var next = getState().activeSection.next();
                    if (!next && (getOptions().loopBottom || getOptions().continuousVertical)) next = getState().sections[0];
                    if (null != next) scrollPage(next, null, false); else if (hasContentBeyondFullPage()) EventEmitter.emit(events.scrollBeyondFullpage);
                }
                function hasContentBeyondFullPage() {
                    return getContainer().scrollHeight < $body.scrollHeight;
                }
                FP.moveSectionUp = moveSectionUp;
                function moveSectionUp() {
                    var prev = getState().activeSection.prev();
                    if (!prev && (getOptions().loopTop || getOptions().continuousVertical)) prev = getLast(getState().sections);
                    if (null != prev) scrollPage(prev, null, true);
                }
                var oldPageY = 0;
                function mouseMoveHandler(e) {
                    if (!getOptions().autoScrolling) return;
                    if (state.canScroll) if (e.pageY < oldPageY && getIsScrollAllowed().m.up) moveSectionUp(); else if (e.pageY > oldPageY && getIsScrollAllowed().m.down) moveSectionDown();
                    oldPageY = e.pageY;
                }
                function setOldPageY(value) {
                    oldPageY = value;
                }
                function scrolling(type) {
                    if (!getIsScrollAllowed().m[type]) return;
                    var scrollSection = "down" === type ? moveSectionDown : moveSectionUp;
                    if (getOptions().scrollOverflow && scrollOverflowHandler.isScrollable(getState().activeSection)) {
                        if (scrollOverflowHandler.isScrolled(type, getState().activeSection.item) && scrollOverflowHandler.shouldMovePage()) scrollSection();
                    } else scrollSection();
                }
                var touchStartY = 0;
                var touchStartX = 0;
                var touchEndY = 0;
                var touchEndX = 0;
                var MSPointer = getMSPointer();
                var pointers = {
                    touchmove: "ontouchmove" in window ? "touchmove" : MSPointer ? MSPointer.move : null,
                    touchstart: "ontouchstart" in window ? "touchstart" : MSPointer ? MSPointer.down : null
                };
                function addTouchHandler() {
                    if (!pointers.touchmove) return;
                    if (isTouchDevice || isTouch) {
                        if (getOptions().autoScrolling) {
                            $body.removeEventListener(pointers.touchmove, preventBouncing, {
                                passive: false
                            });
                            $body.addEventListener(pointers.touchmove, preventBouncing, {
                                passive: false
                            });
                        }
                        var touchWrapper = getOptions().touchWrapper;
                        touchWrapper.removeEventListener(pointers.touchstart, touchStartHandler);
                        touchWrapper.removeEventListener(pointers.touchmove, touchMoveHandler, {
                            passive: false
                        });
                        touchWrapper.addEventListener(pointers.touchstart, touchStartHandler);
                        touchWrapper.addEventListener(pointers.touchmove, touchMoveHandler, {
                            passive: false
                        });
                    }
                }
                function removeTouchHandler() {
                    if (!pointers.touchmove) return;
                    if (isTouchDevice || isTouch) {
                        if (getOptions().autoScrolling) {
                            $body.removeEventListener(pointers.touchmove, touchMoveHandler, {
                                passive: false
                            });
                            $body.removeEventListener(pointers.touchmove, preventBouncing, {
                                passive: false
                            });
                        }
                        var touchWrapper = getOptions().touchWrapper;
                        touchWrapper.removeEventListener(pointers.touchstart, touchStartHandler);
                        touchWrapper.removeEventListener(pointers.touchmove, touchMoveHandler, {
                            passive: false
                        });
                    }
                }
                function touchMoveHandler(e) {
                    var activeSection = closest(e.target, SECTION_SEL) || getState().activeSection.item;
                    var hasActiveSectionOverflow = scrollOverflowHandler.isScrollable(getState().activeSection);
                    if (isReallyTouch(e)) {
                        setState({
                            isGrabbing: true,
                            isUsingWheel: false
                        });
                        if (getOptions().autoScrolling) if (hasActiveSectionOverflow && !state.canScroll || getOptions().scrollBar) preventDefault(e);
                        var touchEvents = getEventsPage(e);
                        touchEndY = touchEvents.y;
                        touchEndX = touchEvents.x;
                        var isVerticalMovementEnough = Math.abs(touchStartY - touchEndY) > win.innerHeight / 100 * getOptions().touchSensitivity;
                        var isHorizontalMovementEnough = Math.abs(touchStartX - touchEndX) > getWindowWidth() / 100 * getOptions().touchSensitivity;
                        var isHorizontalPredominantMove = $(SLIDES_WRAPPER_SEL, activeSection).length && Math.abs(touchStartX - touchEndX) > Math.abs(touchStartY - touchEndY);
                        var directionH = touchStartX > touchEndX ? "right" : "left";
                        var directionV = touchStartY > touchEndY ? "down" : "up";
                        var direction = isHorizontalPredominantMove ? directionH : directionV;
                        setState({
                            touchDirection: direction
                        });
                        if (isHorizontalPredominantMove) {
                            if (!state.slideMoving && isHorizontalMovementEnough) if (touchStartX > touchEndX) {
                                if (getIsScrollAllowed().m.right) EventEmitter.emit(events.moveSlideRight, {
                                    section: activeSection
                                });
                            } else if (getIsScrollAllowed().m.left) EventEmitter.emit(events.moveSlideLeft, {
                                section: activeSection
                            });
                        } else if (getOptions().autoScrolling && state.canScroll) if (isVerticalMovementEnough) scrolling(directionV);
                    }
                }
                function isReallyTouch(e) {
                    return "undefined" === typeof e.pointerType || "mouse" != e.pointerType;
                }
                function touchStartHandler(e) {
                    if (getOptions().fitToSection) setState({
                        activeAnimation: false
                    });
                    if (isReallyTouch(e)) {
                        var touchEvents = getEventsPage(e);
                        touchStartY = touchEvents.y;
                        touchStartX = touchEvents.x;
                    }
                    windowAddEvent("touchend", touchEndHandler);
                }
                function touchEndHandler() {
                    windowRemoveEvent("touchend", touchEndHandler);
                    setState({
                        isGrabbing: false
                    });
                }
                function getEventsPage(e) {
                    var events = {};
                    events.y = "undefined" !== typeof e.pageY && (e.pageY || e.pageX) ? e.pageY : e.touches[0].pageY;
                    events.x = "undefined" !== typeof e.pageX && (e.pageY || e.pageX) ? e.pageX : e.touches[0].pageX;
                    if (isTouch && isReallyTouch(e) && getOptions().scrollBar && "undefined" !== typeof e.touches) {
                        events.y = e.touches[0].pageY;
                        events.x = e.touches[0].pageX;
                    }
                    return events;
                }
                function getMSPointer() {
                    var pointer;
                    if (win.PointerEvent) pointer = {
                        down: "pointerdown",
                        move: "pointermove"
                    };
                    return pointer;
                }
                function preventBouncing(e) {
                    if (getOptions().autoScrolling && isReallyTouch(e) && getIsScrollAllowed().m.up) if (!state.canScroll) preventDefault(e);
                }
                FP.moveSlideLeft = moveSlideLeft;
                FP.moveSlideRight = moveSlideRight;
                function moveSlide(direction, section) {
                    var activeSectionItem = null == section ? getState().activeSection.item : section;
                    var activeSection = getPanelByElement(state.sections, activeSectionItem);
                    var slides = $(SLIDES_WRAPPER_SEL, activeSectionItem)[0];
                    if (null == slides || state.slideMoving || activeSection.slides.length < 2) return;
                    var currentSlide = activeSection.activeSlide;
                    var destiny = "left" === direction ? currentSlide.prev() : currentSlide.next();
                    if (!destiny) {
                        if (!getOptions().loopHorizontal) return;
                        destiny = "left" === direction ? getLast(activeSection.slides) : activeSection.slides[0];
                    }
                    setState({
                        slideMoving: !FP.test.isTesting
                    });
                    landscapeScroll(slides, destiny.item, direction);
                }
                function moveSlideLeft(section) {
                    moveSlide("left", section);
                }
                function moveSlideRight(section) {
                    moveSlide("right", section);
                }
                function getSectionByAnchor(sectionAnchor) {
                    var section = getState().sections.filter((function(section) {
                        return section.anchor === sectionAnchor;
                    }))[0];
                    if (!section) {
                        var sectionIndex = "undefined" !== typeof sectionAnchor ? sectionAnchor - 1 : 0;
                        section = getState().sections[sectionIndex];
                    }
                    return section;
                }
                function scrollSlider(slideElem) {
                    if (null != slideElem) landscapeScroll(closest(slideElem, SLIDES_WRAPPER_SEL), slideElem);
                }
                function scrollPageAndSlide(sectionAnchor, slideAnchor) {
                    var section = getSectionByAnchor(sectionAnchor);
                    if (null == section) return;
                    var slideElem = getSlideByAnchor(slideAnchor, section);
                    if (section.anchor !== state.lastScrolledDestiny && !hasClass(section.item, ACTIVE)) scrollPage(section, (function() {
                        scrollSlider(slideElem);
                    })); else scrollSlider(slideElem);
                }
                function getSlideByAnchor(slideAnchor, section) {
                    var slide = section.slides.filter((function(slide) {
                        return slide.anchor === slideAnchor;
                    }))[0];
                    if (null == slide) {
                        slideAnchor = "undefined" !== typeof slideAnchor ? slideAnchor : 0;
                        slide = section.slides[slideAnchor];
                    }
                    return slide ? slide.item : null;
                }
                FP.moveTo = moveTo$1;
                function moveTo$1(sectionAnchor, slideAnchor) {
                    var destiny = getSectionByAnchor(sectionAnchor);
                    if ("undefined" !== typeof slideAnchor) scrollPageAndSlide(sectionAnchor, slideAnchor); else if (null != destiny) scrollPage(destiny);
                }
                var g_controlPressed;
                var g_keydownId;
                var g_elToFocus;
                EventEmitter.on(events.bindEvents, bindEvents$8);
                function bindEvents$8() {
                    windowAddEvent("blur", blurHandler);
                    docAddEvent("keydown", keydownHandler);
                    docAddEvent("keyup", keyUpHandler);
                    EventEmitter.on(events.onDestroy, onDestroy$5);
                    EventEmitter.on(events.afterSlideLoads, onAfterSlideLoads);
                    EventEmitter.on(events.afterSectionLoads, afterSectionLoads);
                }
                function onDestroy$5() {
                    clearTimeout(g_keydownId);
                    docRemoveEvent("keydown", keydownHandler);
                    docRemoveEvent("keyup", keyUpHandler);
                }
                function isInsideInput() {
                    var activeElement = doc.activeElement;
                    return matches(activeElement, "textarea") || matches(activeElement, "input") || matches(activeElement, "select") || "true" == getAttr(activeElement, "contentEditable") || "" == getAttr(activeElement, "contentEditable");
                }
                function keydownHandler(e) {
                    clearTimeout(g_keydownId);
                    var keyCode = e.keyCode;
                    var isPressingHorizontalArrows = [ 37, 39 ].indexOf(keyCode) > -1;
                    var canScrollWithKeyboard = getOptions().autoScrolling || getOptions().fitToSection || isPressingHorizontalArrows;
                    if (9 === keyCode) onTab(e); else if (!isInsideInput() && getOptions().keyboardScrolling && canScrollWithKeyboard) {
                        g_controlPressed = e.ctrlKey;
                        g_keydownId = setTimeout((function() {
                            onkeydown(e);
                        }), 0);
                    }
                }
                function onkeydown(e) {
                    var shiftPressed = e.shiftKey;
                    var activeElement = doc.activeElement;
                    var isMediaFocused = matches(activeElement, "video") || matches(activeElement, "audio");
                    var isScrolled = {
                        up: scrollOverflowHandler.isScrolled("up", getState().activeSection.item),
                        down: scrollOverflowHandler.isScrolled("down", getState().activeSection.item)
                    };
                    var isUsingHorizontalArrowKeys = [ 37, 39 ].indexOf(e.keyCode) > -1;
                    cancelDirectionKeyEvents(e);
                    if (!state.canScroll && !isUsingHorizontalArrowKeys) return;
                    setState({
                        scrollTrigger: "keydown"
                    });
                    switch (e.keyCode) {
                      case 38:
                      case 33:
                        if (getIsScrollAllowed().k.up && isScrolled.up) if (state.isBeyondFullpage) EventEmitter.emit(events.onKeyDown, {
                            e
                        }); else moveSectionUp();
                        break;

                      case 32:
                        if (shiftPressed && getIsScrollAllowed().k.up && !isMediaFocused && isScrolled.up) {
                            moveSectionUp();
                            break;
                        }

                      case 40:
                      case 34:
                        if (getIsScrollAllowed().k.down && isScrolled.down) {
                            if (state.isBeyondFullpage) return;
                            if (32 !== e.keyCode || !isMediaFocused) moveSectionDown();
                        }
                        break;

                      case 36:
                        if (getIsScrollAllowed().k.up) moveTo$1(1);
                        break;

                      case 35:
                        if (getIsScrollAllowed().k.down) moveTo$1(getState().sections.length);
                        break;

                      case 37:
                        if (getIsScrollAllowed().k.left) moveSlideLeft();
                        break;

                      case 39:
                        if (getIsScrollAllowed().k.right) moveSlideRight();
                        break;

                      default:
                        return;
                    }
                }
                function keyUpHandler(e) {
                    if (state.isWindowFocused) g_controlPressed = e.ctrlKey;
                }
                function blurHandler() {
                    setState({
                        isWindowFocused: false
                    });
                    g_controlPressed = false;
                }
                function onTab(e) {
                    var isShiftPressed = e.shiftKey;
                    var activeElement = doc.activeElement;
                    var focusableElements = getFocusables(getSlideOrSection(getState().activeSection.item));
                    function preventAndFocusFirst(e) {
                        preventDefault(e);
                        return focusableElements[0] ? focusableElements[0].focus() : null;
                    }
                    if (isFocusOutside(e)) return;
                    if (activeElement) {
                        if (null == closest(activeElement, SECTION_ACTIVE_SEL + "," + SECTION_ACTIVE_SEL + " " + SLIDE_ACTIVE_SEL)) activeElement = preventAndFocusFirst(e);
                    } else preventAndFocusFirst(e);
                    var isFirstFocusableInSection = activeElement == focusableElements[0];
                    var isLastFocusableInSection = activeElement == focusableElements[focusableElements.length - 1];
                    var isNextItem = !isShiftPressed && isLastFocusableInSection;
                    var isPrevItem = isShiftPressed && isFirstFocusableInSection;
                    if (isPrevItem || isNextItem) {
                        preventDefault(e);
                        var focusInfo = getPanelWithFocusable(isPrevItem);
                        var destinationPanel = focusInfo ? focusInfo.panel : null;
                        if (destinationPanel) {
                            var destinationSection = destinationPanel.isSection ? destinationPanel : destinationPanel.parent;
                            EventEmitter.emit(events.onScrollPageAndSlide, {
                                sectionAnchor: destinationSection.index() + 1,
                                slideAnchor: destinationPanel.isSection ? 0 : destinationPanel.index()
                            });
                            g_elToFocus = focusInfo.itemToFocus;
                            preventDefault(e);
                        }
                    }
                }
                function onAfterSlideLoads(v) {
                    focusItem();
                }
                function afterSectionLoads(v) {
                    if (!closest(g_elToFocus, SLIDE_SEL) || closest(g_elToFocus, SLIDE_ACTIVE_SEL)) focusItem();
                }
                function focusItem() {
                    if (g_elToFocus) {
                        g_elToFocus.focus();
                        g_elToFocus = null;
                    }
                }
                function getPanelWithFocusable(isPrevItem) {
                    var action = isPrevItem ? "prevPanel" : "nextPanel";
                    var focusableElements = [];
                    var panelWithFocusables;
                    var currentPanel = getSlideOrSectionPanel(getActivePanel()[action]());
                    do {
                        focusableElements = getFocusables(currentPanel.item);
                        if (focusableElements.length) panelWithFocusables = {
                            panel: currentPanel,
                            itemToFocus: focusableElements[isPrevItem ? focusableElements.length - 1 : 0]
                        };
                        currentPanel = getSlideOrSectionPanel(currentPanel[action]());
                    } while (currentPanel && 0 === focusableElements.length);
                    return panelWithFocusables;
                }
                function getFocusables(el) {
                    return [].slice.call($(focusableElementsString, el)).filter((function(item) {
                        return "-1" !== getAttr(item, "tabindex") && null !== item.offsetParent;
                    }));
                }
                function isFocusOutside(e) {
                    var allFocusables = getFocusables(doc);
                    var currentFocusIndex = allFocusables.indexOf(doc.activeElement);
                    var focusDestinationIndex = e.shiftKey ? currentFocusIndex - 1 : currentFocusIndex + 1;
                    var focusDestination = allFocusables[focusDestinationIndex];
                    var destinationItemSlide = closest(focusDestination, SLIDE_SEL);
                    var destinationItemSection = closest(focusDestination, SECTION_SEL);
                    return !destinationItemSlide && !destinationItemSection;
                }
                function shouldCancelKeyboardNavigation(e) {
                    var keyControls = [ 40, 38, 32, 33, 34 ];
                    return keyControls.indexOf(e.keyCode) > -1 && !state.isBeyondFullpage;
                }
                function cancelDirectionKeyEvents(e) {
                    if (shouldCancelKeyboardNavigation(e) && !closest(e.target, OVERFLOW_SEL)) e.preventDefault();
                }
                function getControlPressed() {
                    return g_controlPressed;
                }
                var prevTime = (new Date).getTime();
                var scrollings = [];
                FP.setMouseWheelScrolling = setMouseWheelScrolling;
                function setMouseWheelScrolling(value) {
                    if (value) {
                        addMouseWheelHandler();
                        addMiddleWheelHandler();
                    } else {
                        removeMouseWheelHandler();
                        removeMiddleWheelHandler();
                    }
                }
                function addMouseWheelHandler() {
                    var prefix = "";
                    var _addEventListener;
                    if (win.addEventListener) _addEventListener = "addEventListener"; else {
                        _addEventListener = "attachEvent";
                        prefix = "on";
                    }
                    var support = "onwheel" in doc.createElement("div") ? "wheel" : void 0 !== doc.onmousewheel ? "mousewheel" : "DOMMouseScroll";
                    var passiveEvent = getPassiveOptionsIfPossible();
                    if ("DOMMouseScroll" == support) doc[_addEventListener](prefix + "MozMousePixelScroll", MouseWheelHandler, passiveEvent); else doc[_addEventListener](prefix + support, MouseWheelHandler, passiveEvent);
                }
                function addMiddleWheelHandler() {
                    getContainer().addEventListener("mousedown", mouseDownHandler);
                    getContainer().addEventListener("mouseup", mouseUpHandler);
                }
                function removeMouseWheelHandler() {
                    if (doc.addEventListener) {
                        docRemoveEvent("mousewheel", MouseWheelHandler, false);
                        docRemoveEvent("wheel", MouseWheelHandler, false);
                        docRemoveEvent("MozMousePixelScroll", MouseWheelHandler, false);
                    } else doc.detachEvent("onmousewheel", MouseWheelHandler);
                }
                function removeMiddleWheelHandler() {
                    getContainer().removeEventListener("mousedown", mouseDownHandler);
                    getContainer().removeEventListener("mouseup", mouseUpHandler);
                }
                function MouseWheelHandler(e) {
                    var curTime = (new Date).getTime();
                    var isNormalScroll = hasClass($(COMPLETELY_SEL)[0], NORMAL_SCROLL);
                    var isScrollAllowedBeyondFullPage = beyondFullPageHandler(getContainer(), e);
                    if (!state.isUsingWheel) setState({
                        isGrabbing: false,
                        isUsingWheel: true,
                        touchDirection: "none"
                    });
                    if (!getIsScrollAllowed().m.down && !getIsScrollAllowed().m.up) {
                        preventDefault(e);
                        return false;
                    }
                    if (isScrollAllowedBeyondFullPage) return true; else if (false === isScrollAllowedBeyondFullPage) {
                        preventDefault(e);
                        return false;
                    }
                    if (getOptions().autoScrolling && !getControlPressed() && !isNormalScroll) {
                        e = e || win.event;
                        var value = e.wheelDelta || -e.deltaY || -e.detail;
                        var delta = Math.max(-1, Math.min(1, value));
                        var horizontalDetection = "undefined" !== typeof e.wheelDeltaX || "undefined" !== typeof e.deltaX;
                        var isScrollingVertically = Math.abs(e.wheelDeltaX) < Math.abs(e.wheelDelta) || Math.abs(e.deltaX) < Math.abs(e.deltaY) || !horizontalDetection;
                        var direction = delta < 0 ? "down" : delta > 0 ? "up" : "none";
                        if (scrollings.length > 149) scrollings.shift();
                        scrollings.push(Math.abs(value));
                        if (getOptions().scrollBar) preventDefault(e);
                        var timeDiff = curTime - prevTime;
                        prevTime = curTime;
                        if (timeDiff > 200) scrollings = [];
                        setState({
                            wheelDirection: direction
                        });
                        if (state.canScroll) {
                            var averageEnd = getAverage(scrollings, 10);
                            var averageMiddle = getAverage(scrollings, 70);
                            var isAccelerating = averageEnd >= averageMiddle;
                            if (isAccelerating && isScrollingVertically) {
                                setState({
                                    scrollTrigger: "wheel"
                                });
                                if (delta < 0) scrolling("down"); else scrolling("up");
                            }
                        }
                        return false;
                    }
                    if (getOptions().fitToSection) setState({
                        activeAnimation: false
                    });
                }
                function mouseDownHandler(e) {
                    if (2 == e.which) {
                        setOldPageY(e.pageY);
                        getContainer().addEventListener("mousemove", mouseMoveHandler);
                    }
                }
                function mouseUpHandler(e) {
                    if (2 == e.which) getContainer().removeEventListener("mousemove", mouseMoveHandler);
                }
                function setMouseHijack(value) {
                    if (value) {
                        setMouseWheelScrolling(true);
                        addTouchHandler();
                    } else {
                        setMouseWheelScrolling(false);
                        removeTouchHandler();
                    }
                }
                var g_canFireMouseEnterNormalScroll = true;
                EventEmitter.on(events.bindEvents, bindEvents$7);
                function bindEvents$7() {
                    if (getOptions().normalScrollElements) {
                        [ "mouseenter", "touchstart" ].forEach((function(eventName) {
                            forMouseLeaveOrTouch(eventName, false);
                        }));
                        [ "mouseleave", "touchend" ].forEach((function(eventName) {
                            forMouseLeaveOrTouch(eventName, true);
                        }));
                    }
                    EventEmitter.on(events.onDestroy, onDestroy$4);
                }
                function onDestroy$4() {
                    [ "mouseenter", "touchstart", "mouseleave", "touchend" ].forEach((function(eventName) {
                        docRemoveEvent(eventName, onMouseEnterOrLeave, true);
                    }));
                }
                function forMouseLeaveOrTouch(eventName, allowScrolling) {
                    document["fp_" + eventName] = allowScrolling;
                    docAddEvent(eventName, onMouseEnterOrLeave, true);
                }
                function onMouseEnterOrLeave(e) {
                    var type = e.type;
                    var isInsideOneNormalScroll = false;
                    var target = "mouseleave" === type ? e.toElement || e.relatedTarget : e.target;
                    if (target == document || !target) {
                        setMouseHijack(true);
                        return;
                    }
                    if ("touchend" === type) {
                        g_canFireMouseEnterNormalScroll = false;
                        setTimeout((function() {
                            g_canFireMouseEnterNormalScroll = true;
                        }), 800);
                    }
                    if ("mouseenter" === type && !g_canFireMouseEnterNormalScroll) return;
                    var normalSelectors = getOptions().normalScrollElements.split(",");
                    normalSelectors.forEach((function(normalSelector) {
                        if (!isInsideOneNormalScroll) {
                            var isNormalScrollTarget = matches(target, normalSelector);
                            var isNormalScrollChildFocused = closest(target, normalSelector);
                            if (isNormalScrollTarget || isNormalScrollChildFocused) {
                                if (!FP.shared.isNormalScrollElement) setMouseHijack(false);
                                FP.shared.isNormalScrollElement = true;
                                isInsideOneNormalScroll = true;
                            }
                        }
                    }));
                    if (!isInsideOneNormalScroll && FP.shared.isNormalScrollElement) {
                        setMouseHijack(true);
                        FP.shared.isNormalScrollElement = false;
                    }
                }
                FP.silentMoveTo = silentMoveTo;
                function silentMoveTo(sectionAnchor, slideAnchor) {
                    setScrollingSpeed(0, "internal");
                    moveTo$1(sectionAnchor, slideAnchor);
                    setScrollingSpeed(getOriginals().scrollingSpeed, "internal");
                }
                var previousHeight = getWindowHeight();
                var windowsWidth = getWindowWidth();
                var g_resizeId;
                var g_isConsecutiveResize = false;
                var g_resizeMobileHandlerId;
                FP.reBuild = reBuild;
                EventEmitter.on(events.bindEvents, bindEvents$6);
                function bindEvents$6() {
                    resizeHandler();
                    windowAddEvent("resize", resizeHandler);
                    EventEmitter.on(events.onDestroy, onDestroy$3);
                }
                function onDestroy$3() {
                    clearTimeout(g_resizeId);
                    clearTimeout(g_resizeMobileHandlerId);
                    windowRemoveEvent("resize", resizeHandler);
                }
                function resizeHandler() {
                    if (!g_isConsecutiveResize) if (getOptions().autoScrolling && !getOptions().scrollBar || !getOptions().fitToSection) setSectionsHeight(getWindowHeight());
                    fitToActiveSection();
                    g_isConsecutiveResize = true;
                    clearTimeout(g_resizeId);
                    g_resizeId = setTimeout((function() {
                        resizeActions();
                        g_isConsecutiveResize = false;
                    }), 400);
                }
                function fitToActiveSection() {
                    if (isTouchDevice) for (var i = 0; i < 4; i++) g_resizeMobileHandlerId = setTimeout((function() {
                        window.requestAnimationFrame((function() {
                            if (getOptions().autoScrolling && !getOptions().scrollBar) {
                                setState({
                                    isResizing: true
                                });
                                silentMoveTo(state.activeSection.index() + 1);
                                setState({
                                    isResizing: false
                                });
                            }
                        }));
                    }), 200 * i);
                }
                function resizeActions() {
                    setState({
                        isResizing: true
                    });
                    setSectionsHeight("");
                    if (!getOptions().autoScrolling && !state.isBeyondFullpage) setVhUnits();
                    EventEmitter.emit(events.contentChanged);
                    updateState();
                    responsive();
                    if (isTouchDevice) {
                        var activeElement = doc.activeElement;
                        if (!matches(activeElement, "textarea") && !matches(activeElement, "input") && !matches(activeElement, "select")) {
                            var currentHeight = getWindowHeight();
                            if (Math.abs(currentHeight - previousHeight) > 20 * Math.max(previousHeight, currentHeight) / 100) {
                                reBuild(true);
                                previousHeight = currentHeight;
                            }
                        }
                    } else adjustToNewViewport();
                    setState({
                        isResizing: false
                    });
                }
                function reBuild(resizing) {
                    if (hasClass(getContainer(), DESTROYED)) return;
                    setState({
                        isResizing: true,
                        windowsHeight: getWindowHeight(),
                        windowsWidth: getWindowWidth()
                    });
                    var sections = getState().sections;
                    for (var i = 0; i < sections.length; ++i) {
                        var section = sections[i];
                        var slidesWrap = $(SLIDES_WRAPPER_SEL, section.item)[0];
                        var slides = section.slides;
                        if (slides.length > 1) landscapeScroll(slidesWrap, section.activeSlide.item);
                    }
                    if (getOptions().scrollOverflow) scrollOverflowHandler.makeScrollable();
                    var sectionIndex = getState().activeSection.index();
                    if (!state.isBeyondFullpage) if (sectionIndex) silentMoveTo(sectionIndex + 1);
                    setState({
                        isResizing: false
                    });
                    if (isFunction(getOptions().afterResize) && resizing) getOptions().afterResize.call(getContainer(), win.innerWidth, win.innerHeight);
                    if (isFunction(getOptions().afterReBuild) && !resizing) getOptions().afterReBuild.call(getContainer());
                    trigger(getContainer(), "afterRebuild");
                }
                function adjustToNewViewport() {
                    var newWindowHeight = getWindowHeight();
                    var newWindowWidth = getWindowWidth();
                    if (state.windowsHeight !== newWindowHeight || windowsWidth !== newWindowWidth) {
                        setState({
                            windowsHeight: newWindowHeight
                        });
                        windowsWidth = newWindowWidth;
                        reBuild(true);
                    }
                }
                function setSectionsHeight(value) {
                    var propertyValue = "" === value ? "" : value + "px";
                    getState().sections.forEach((function(section) {
                        css(section.item, {
                            height: propertyValue
                        });
                    }));
                }
                function setVhUnits() {
                    if (!getOptions().autoScrolling || getOptions().scrollBar) {
                        var vh = .01 * win.innerHeight;
                        doc.documentElement.style.setProperty("--vh", "".concat(vh, "px"));
                    }
                }
                function getAnchorsURL() {
                    var section;
                    var slide;
                    var hash = win.location.hash;
                    if (hash.length) {
                        var anchorsParts = hash.replace("#", "").split("/");
                        var isFunkyAnchor = hash.indexOf("#/") > -1;
                        section = isFunkyAnchor ? "/" + anchorsParts[1] : decodeURIComponent(anchorsParts[0]);
                        var slideAnchor = isFunkyAnchor ? anchorsParts[2] : anchorsParts[1];
                        if (slideAnchor && slideAnchor.length) slide = decodeURIComponent(slideAnchor);
                    }
                    return {
                        section,
                        slide
                    };
                }
                FP.setLockAnchors = setLockAnchors;
                EventEmitter.on(events.bindEvents, bindEvents$5);
                function bindEvents$5() {
                    windowAddEvent("hashchange", hashChangeHandler);
                    EventEmitter.on(events.onDestroy, onDestroy$2);
                }
                function onDestroy$2() {
                    windowRemoveEvent("hashchange", hashChangeHandler);
                }
                function setLockAnchors(value) {
                    getOptions().lockAnchors = value;
                }
                function hashChangeHandler() {
                    if (!state.isScrolling && !getOptions().lockAnchors) {
                        var anchors = getAnchorsURL();
                        var sectionAnchor = anchors.section;
                        var slideAnchor = anchors.slide;
                        var isFirstSlideMove = "undefined" === typeof state.lastScrolledDestiny;
                        var isFirstScrollMove = "undefined" === typeof state.lastScrolledDestiny && "undefined" === typeof slideAnchor && !state.slideMoving;
                        if (sectionAnchor && sectionAnchor.length) if (sectionAnchor && sectionAnchor !== state.lastScrolledDestiny && !isFirstSlideMove || isFirstScrollMove || !state.slideMoving && state.lastScrolledSlide != slideAnchor) EventEmitter.emit(events.onScrollPageAndSlide, {
                            sectionAnchor,
                            slideAnchor
                        });
                    }
                }
                EventEmitter.on(events.bindEvents, bindEvents$4);
                function bindEvents$4() {
                    docAddEvent("wheel", wheelDataHandler.registerEvent, getPassiveOptionsIfPossible());
                    EventEmitter.on(events.scrollBeyondFullpage, scrollBeyondFullPage);
                    EventEmitter.on(events.onKeyDown, onKeyDown);
                }
                EventEmitter.on(events.bindEvents, bindEvents$3);
                function bindEvents$3() {
                    EventEmitter.on(events.onClickOrTouch, onClickOrTouch$1);
                }
                function onClickOrTouch$1(params) {
                    var target = params.target;
                    if (closest(target, getOptions().menu + " [data-menuanchor]")) menuItemsHandler.call(target, params);
                }
                function menuItemsHandler(e) {
                    setState({
                        scrollTrigger: "menu"
                    });
                    if ($(getOptions().menu)[0] && (getOptions().lockAnchors || !getOptions().anchors.length)) {
                        preventDefault(e);
                        EventEmitter.emit(events.onMenuClick, {
                            anchor: getAttr(this, "data-menuanchor")
                        });
                    }
                }
                EventEmitter.on(events.bindEvents, bindEvents$2);
                function bindEvents$2() {
                    EventEmitter.on(events.onClickOrTouch, onClickOrTouch);
                }
                function onClickOrTouch(params) {
                    var target = params.target;
                    if (target && closest(target, SECTION_NAV_SEL + " a")) sectionBulletHandler.call(target, params.e); else if (matches(target, SECTION_NAV_TOOLTIP_SEL)) tooltipTextHandler.call(target); else if (matches(target, SLIDES_NAV_LINK_SEL) || null != closest(target, SLIDES_NAV_LINK_SEL)) slideBulletHandler.call(target, params.e);
                }
                var lastScroll = 0;
                var g_scrollId;
                var g_scrollId2;
                EventEmitter.on(events.onDestroy, onDestroy$1);
                function scrollHandler(e) {
                    var currentSection;
                    var currentSectionElem;
                    if (state.isResizing || !getState().activeSection) return;
                    getLast(getState().sections);
                    if (getState().isBeyondFullpage || getState().isAboutToScrollToFullPage) return;
                    if (!getOptions().autoScrolling || getOptions().scrollBar) {
                        var currentScroll = getScrollTop();
                        var scrollDirection = getScrollDirection(currentScroll);
                        var visibleSectionIndex = 0;
                        var screen_mid = currentScroll + getWindowHeight() / 2;
                        var isAtBottom = $body.scrollHeight - getWindowHeight() === currentScroll;
                        var sections = getState().sections;
                        setState({
                            scrollY: currentScroll
                        });
                        if (isAtBottom) visibleSectionIndex = sections.length - 1; else if (!currentScroll) visibleSectionIndex = 0; else for (var i = 0; i < sections.length; ++i) {
                            var section = sections[i].item;
                            if (section.offsetTop <= screen_mid) visibleSectionIndex = i;
                        }
                        if (isCompletelyInViewPort(scrollDirection)) if (!hasClass(getState().activeSection.item, COMPLETELY)) {
                            addClass(getState().activeSection.item, COMPLETELY);
                            removeClass(siblings(getState().activeSection.item), COMPLETELY);
                        }
                        currentSection = sections[visibleSectionIndex];
                        currentSectionElem = currentSection.item;
                        if (!currentSection.isActive) {
                            setState({
                                isScrolling: true
                            });
                            var leavingSection = getState().activeSection.item;
                            var leavingSectionIndex = getState().activeSection.index() + 1;
                            var yMovement = getYmovement(getState().activeSection, currentSectionElem);
                            var anchorLink = currentSection.anchor;
                            var sectionIndex = currentSection.index() + 1;
                            var activeSlide = currentSection.activeSlide;
                            var slideIndex;
                            var slideAnchorLink;
                            var callbacksParams = {
                                activeSection: leavingSection,
                                sectionIndex: sectionIndex - 1,
                                anchorLink,
                                element: currentSectionElem,
                                leavingSection: leavingSectionIndex,
                                direction: yMovement,
                                items: {
                                    origin: getState().activeSection,
                                    destination: currentSection
                                }
                            };
                            if (activeSlide) {
                                slideAnchorLink = activeSlide.anchor;
                                slideIndex = activeSlide.index();
                            }
                            if (state.canScroll) {
                                addClass(currentSectionElem, ACTIVE);
                                removeClass(siblings(currentSectionElem), ACTIVE);
                                if (isFunction(getOptions().beforeLeave)) fireCallbackOncePerScroll("beforeLeave", callbacksParams);
                                if (isFunction(getOptions().onLeave)) fireCallback("onLeave", callbacksParams);
                                if (isFunction(getOptions().afterLoad)) fireCallback("afterLoad", callbacksParams);
                                stopMedia(leavingSection);
                                lazyLoad(currentSectionElem);
                                playMedia(currentSectionElem);
                                activateMenuAndNav(anchorLink, sectionIndex - 1);
                                if (getOptions().anchors.length) setState({
                                    lastScrolledDestiny: anchorLink
                                });
                                setPageStatus(slideIndex, slideAnchorLink, anchorLink);
                                updateState();
                            }
                            clearTimeout(g_scrollId);
                            g_scrollId = setTimeout((function() {
                                setState({
                                    isScrolling: false
                                });
                            }), 100);
                        }
                        if (getOptions().fitToSection && state.canScroll) {
                            clearTimeout(g_scrollId2);
                            g_scrollId2 = setTimeout((function() {
                                var fixedSections = state.sections.filter((function(section) {
                                    var sectionValues = section.item.getBoundingClientRect();
                                    return Math.round(sectionValues.bottom) === Math.round(getWindowHeight()) || 0 === Math.round(sectionValues.top);
                                }));
                                if (!fixedSections.length) fitToSection();
                            }), getOptions().fitToSectionDelay);
                        }
                    }
                }
                function onDestroy$1() {
                    clearTimeout(g_scrollId);
                    clearTimeout(g_scrollId2);
                }
                function getScrollDirection(currentScroll) {
                    var direction = currentScroll > lastScroll ? "down" : "up";
                    lastScroll = currentScroll;
                    setState({
                        previousDestTop: currentScroll
                    });
                    return direction;
                }
                function isCompletelyInViewPort(movement) {
                    var top = getState().activeSection.item.offsetTop;
                    var bottom = top + getWindowHeight();
                    if ("up" == movement) return bottom >= getScrollTop() + getWindowHeight();
                    return top <= getScrollTop();
                }
                EventEmitter.on(events.bindEvents, bindEvents$1);
                EventEmitter.on(events.onDestroy, onDestroy);
                function onDestroy() {
                    windowRemoveEvent("scroll", scrollHandler);
                }
                function bindEvents$1() {
                    windowAddEvent("scroll", scrollHandler);
                    doc.body.addEventListener("scroll", scrollHandler);
                    EventEmitter.on(events.onScrollPageAndSlide, (function(params) {
                        scrollPageAndSlide(params.sectionAnchor, params.slideAnchor);
                    }));
                    EventEmitter.on(events.onMenuClick, (function(params) {
                        moveTo$1(params.anchor, void 0);
                    }));
                    EventEmitter.on(events.onScrollOverflowScrolled, (function(params) {
                        var scrollSection = "down" === params.direction ? moveSectionDown : moveSectionUp;
                        scrollSection();
                    }));
                    EventEmitter.on(events.scrollPage, (function(params) {
                        scrollPage(params.destination);
                    }));
                }
                FP.getActiveSlide = getActiveSlide;
                FP.getScrollX = function() {
                    return state.scrollX;
                };
                EventEmitter.on(events.bindEvents, bindEvents);
                function bindEvents() {
                    EventEmitter.on(events.onDestroy, onDestroy$7);
                    EventEmitter.on(events.landscapeScroll, (function(params) {
                        landscapeScroll(params.slides, params.destination);
                    }));
                    EventEmitter.on(events.moveSlideRight, (function(params) {
                        moveSlideRight(params.section);
                    }));
                    EventEmitter.on(events.moveSlideLeft, (function(params) {
                        moveSlideLeft(params.section);
                    }));
                }
                function getActiveSlide() {
                    return nullOrSlide(getState().activeSection.activeSlide);
                }
                EventEmitter.on(events.bindEvents, init$1);
                function init$1() {
                    var position = getOptions().credits.position;
                    var positionStyle = [ "left", "right" ].indexOf(position) > -1 ? "".concat(position, ": 0;") : "";
                    var waterMark = '\n        <div class="fp-watermark" style="'.concat(positionStyle, '">\n            <a href="https://alvarotrigo.com/fullPage/" \n                rel="nofollow noopener" \n                target="_blank" \n                style="text-decoration:none; color: #000;">\n                    ').concat(getOptions().credits.label, "\n            </a>\n        </div>\n    ");
                    var lastSection = getLast(state.sections);
                    var shouldUseWaterMark = !state.isValid || getOptions().credits.enabled;
                    if (lastSection && lastSection.item && shouldUseWaterMark) lastSection.item.insertAdjacentHTML("beforeend", waterMark);
                }
                !function() {
                    EventEmitter.on(events.onInitialise, (function() {
                        var n, a, l;
                        setState({
                            isValid: (getOptions().licenseKey, n = getOptions().licenseKey, a = function(n) {
                                var e = parseInt("514").toString(16);
                                if (!n || n.length < 29 || 4 === n.split(t[0]).length) return null;
                                var i = [ "Each", "for" ][r()]().join(""), a = n[[ "split" ]]("-"), l = [];
                                a[i]((function(t, n) {
                                    if (n < 4) {
                                        var i = function(t) {
                                            var n = t[t.length - 1], e = [ "NaN", "is" ][r()]().join("");
                                            return window[e](n) ? o(n) : function(t) {
                                                return t - ACTIVE.length;
                                            }(n);
                                        }(t);
                                        l.push(i);
                                        var s = o(t[i]);
                                        if (1 === n) {
                                            var a = [ "pa", "dS", "t", "art" ].join("");
                                            s = s.toString()[a](2, "0");
                                        }
                                        e += s, 0 !== n && 1 !== n || (e += "-");
                                    }
                                }));
                                var m = 0, p = "";
                                return n.split("-").forEach((function(t, n) {
                                    if (n < 4) {
                                        var _r = 0;
                                        for (var e = 0; e < 4; e++) e !== l[n] && (_r += Math.abs(o(t[e])), isNaN(t[e]) || m++);
                                        var i = s(_r);
                                        p += i;
                                    }
                                })), p += s(m), {
                                    v: new Date(e + "T00:00"),
                                    o: e.split("-")[2] === 8 * (ACTIVE.length - 2) + "",
                                    l: p
                                };
                            }(n), l = function(t) {
                                var n = i[r()]().join("");
                                return t && 0 === n.indexOf(t) && t.length === n.length;
                            }(n), (a || l) && (getOptions().credits && a && e <= a.v && a.l === n.split(t[0])[4] || l || a.o) || !1)
                        });
                    }));
                    var t = [ "-" ];
                    var n = "2022-10-21".split("-"), e = new Date(n[0], n[1], n[2]), i = [ "se", "licen", "-", "v3", "l", "gp" ];
                    function r() {
                        return [ [ "re", "verse" ].join("") ]["".length];
                    }
                    function o(t) {
                        return t ? isNaN(t) ? t.charCodeAt(0) - 72 : t : "";
                    }
                    function s(t) {
                        var n = 72 + t;
                        return n > 90 && n < 97 && (n += 15), String.fromCharCode(n).toUpperCase();
                    }
                }();
                FP.setKeyboardScrolling = setKeyboardScrolling;
                function setKeyboardScrolling(value, directions) {
                    if ("undefined" !== typeof directions) {
                        directions = directions.replace(/ /g, "").split(",");
                        directions.forEach((function(direction) {
                            setIsScrollAllowed(value, direction, "k");
                        }));
                    } else {
                        setIsScrollAllowed(value, "all", "k");
                        getOptions().keyboardScrolling = value;
                    }
                }
                function styleMenu(section) {
                    var index = section.index();
                    if ("undefined" !== typeof getOptions().anchors[index]) if (section.isActive) activateMenuAndNav(getOptions().anchors[index], index);
                    if (getOptions().menu && getOptions().css3 && null != closest($(getOptions().menu)[0], WRAPPER_SEL)) $(getOptions().menu).forEach((function(menu) {
                        $body.appendChild(menu);
                    }));
                }
                function prepareDom() {
                    css(getParentsUntil(getContainer(), "body"), {
                        height: "100%",
                        position: "relative"
                    });
                    addClass(getContainer(), WRAPPER);
                    addClass($html, ENABLED);
                    setState({
                        windowsHeight: getWindowHeight()
                    });
                    removeClass(getContainer(), DESTROYED);
                    addInternalSelectors();
                    var sections = getState().sectionsIncludingHidden;
                    for (var i = 0; i < sections.length; i++) {
                        var section = sections[i];
                        var slides = section.allSlidesItems;
                        section.item.setAttribute("data-fp-styles", getAttr(section.item, "style"));
                        styleSection(section);
                        styleMenu(section);
                        if (slides.length > 0) styleSlides(section);
                    }
                    if (getOptions().fixedElements && getOptions().css3) $(getOptions().fixedElements).forEach((function(item) {
                        $body.appendChild(item);
                    }));
                    if (getOptions().navigation) addVerticalNavigation();
                    enableYoutubeAPI();
                    if (getOptions().scrollOverflow) scrollOverflowHandler.makeScrollable();
                }
                FP.shared.afterRenderActions = afterRenderActions;
                function afterRenderActions() {
                    var section = getState().activeSection;
                    var sectionElem = getState().activeSection.item;
                    addClass(sectionElem, COMPLETELY);
                    lazyLoad(sectionElem);
                    lazyLoadOthers();
                    playMedia(sectionElem);
                    if (isDestinyTheStartingSection() && isFunction(getOptions().afterLoad)) fireCallback("afterLoad", {
                        activeSection: sectionElem,
                        element: sectionElem,
                        direction: null,
                        anchorLink: section.anchor,
                        sectionIndex: section.index(),
                        items: {
                            origin: getState().activeSection,
                            destination: getState().activeSection
                        }
                    });
                    if (isFunction(getOptions().afterRender)) fireCallback("afterRender");
                }
                function isDestinyTheStartingSection() {
                    var anchor = getAnchorsURL();
                    var destinationSection = getSectionByAnchor(anchor.section);
                    return !anchor.section || !destinationSection || "undefined" !== typeof destinationSection && destinationSection.index() === index(getStartingSection());
                }
                FP.setAllowScrolling = setAllowScrolling;
                function setAllowScrolling(value, directions) {
                    if ("undefined" !== typeof directions) {
                        directions = directions.replace(/ /g, "").split(",");
                        directions.forEach((function(direction) {
                            setIsScrollAllowed(value, direction, "m");
                        }));
                    } else setIsScrollAllowed(value, "all", "m");
                }
                function scrollToAnchor() {
                    var anchors = getAnchorsURL();
                    var sectionAnchor = anchors.section;
                    var slideAnchor = anchors.slide;
                    if (sectionAnchor) if (getOptions().animateAnchor) scrollPageAndSlide(sectionAnchor, slideAnchor); else silentMoveTo(sectionAnchor, slideAnchor); else EventEmitter.emit(events.onAfterRenderNoAnchor, null);
                }
                function destroyStructure() {
                    silentScroll(0);
                    $("img[data-src], source[data-src], audio[data-src], iframe[data-src]", getContainer()).forEach((function(item) {
                        setSrc(item, "src");
                    }));
                    $("img[data-srcset]").forEach((function(item) {
                        setSrc(item, "srcset");
                    }));
                    remove($(SECTION_NAV_SEL + ", " + SLIDES_NAV_SEL + ", " + SLIDES_ARROW_SEL));
                    css(getNodes(getState().sections), {
                        height: "",
                        "background-color": "",
                        padding: ""
                    });
                    css(getNodes(getState().slides), {
                        width: ""
                    });
                    css(getContainer(), {
                        height: "",
                        position: "",
                        "-ms-touch-action": "",
                        "touch-action": ""
                    });
                    css($htmlBody, {
                        overflow: "",
                        height: ""
                    });
                    removeClass($html, ENABLED);
                    removeClass($body, RESPONSIVE);
                    $body.className.split(/\s+/).forEach((function(className) {
                        if (0 === className.indexOf(VIEWING_PREFIX)) removeClass($body, className);
                    }));
                    getNodes(getState().panels).forEach((function(item) {
                        if (getOptions().scrollOverflow) scrollOverflowHandler.destroyWrapper(item);
                        removeClass(item, TABLE + " " + ACTIVE + " " + COMPLETELY);
                        var previousStyles = getAttr(item, "data-fp-styles");
                        if (previousStyles) item.setAttribute("style", getAttr(item, "data-fp-styles"));
                        if (hasClass(item, SECTION) && !getInitialAnchorsInDom()) item.removeAttribute("data-anchor");
                    }));
                    removeAnimation(getContainer());
                    [ TABLE_CELL_SEL, SLIDES_CONTAINER_SEL, SLIDES_WRAPPER_SEL ].forEach((function(selector) {
                        $(selector, getContainer()).forEach((function(item) {
                            unwrap(item);
                        }));
                    }));
                    css(getContainer(), {
                        "-webkit-transition": "none",
                        transition: "none"
                    });
                    win.scrollTo(0, 0);
                    var usedSelectors = [ SECTION, SLIDE, SLIDES_CONTAINER ];
                    usedSelectors.forEach((function(item) {
                        removeClass($("." + item), item);
                    }));
                }
                FP.destroy = destroy;
                function init() {
                    updateStructuralState();
                    updateState();
                    getOptions().scrollBar = getOptions().scrollBar || getOptions().hybrid;
                    setOptionsFromDOM();
                    prepareDom();
                    setAllowScrolling(true);
                    setMouseHijack(true);
                    setAutoScrolling(getOptions().autoScrolling, "internal");
                    responsive();
                    setBodyClass();
                    if ("complete" === doc.readyState) scrollToAnchor();
                    windowAddEvent("load", scrollToAnchor);
                    afterRenderActions();
                    updateStructuralState();
                    updateState();
                }
                function destroy(all) {
                    setAutoScrolling(false, "internal");
                    setAllowScrolling(true);
                    setMouseHijack(false);
                    setKeyboardScrolling(false);
                    addClass(getContainer(), DESTROYED);
                    EventEmitter.emit(events.onDestroy);
                    if (all) destroyStructure();
                }
                var isOK = function isOK() {
                    return getOptions() && state.isValid || doc.domain.indexOf("al" + "varotri" + "go" + "." + "com") > -1;
                };
                function displayWarnings() {
                    var l = getOptions()["li" + "c" + "enseK" + "e" + "y"];
                    var msgStyle = "font-size: 15px;background:yellow;";
                    if ("" === getOptions().licenseKey.trim()) {
                        showError("error", "Fullpage.js requires a `licenseKey` option. Read about it on the following URL:");
                        showError("error", "https://github.com/alvarotrigo/fullPage.js#options");
                    } else if (!isOK()) {
                        showError("error", "Incorrect `licenseKey`. Get one for fullPage.js version 4 here:");
                        showError("error", "https://alvarotrigo.com/fullPage/pricing");
                    } else if (l && l.length < 20) {
                        console.warn("%c This website was made using fullPage.js slider. More info on the following website:", msgStyle);
                        console.warn("%c https://alvarotrigo.com/fullPage/", msgStyle);
                    }
                    if (hasClass($html, ENABLED)) {
                        showError("error", "Fullpage.js can only be initialized once and you are doing it multiple times!");
                        return;
                    }
                    if (getOptions().continuousVertical && (getOptions().loopTop || getOptions().loopBottom)) {
                        getOptions().continuousVertical = false;
                        showError("warn", "Option `loopTop/loopBottom` is mutually exclusive with `continuousVertical`; `continuousVertical` disabled");
                    }
                    if (getOptions().scrollOverflow && (getOptions().scrollBar || !getOptions().autoScrolling)) showError("warn", "Options scrollBar:true and autoScrolling:false are mutually exclusive with scrollOverflow:true. Sections with scrollOverflow might not work well in Firefox");
                    if (getOptions().continuousVertical && (getOptions().scrollBar || !getOptions().autoScrolling)) {
                        getOptions().continuousVertical = false;
                        showError("warn", "Scroll bars (`scrollBar:true` or `autoScrolling:false`) are mutually exclusive with `continuousVertical`; `continuousVertical` disabled");
                    }
                    extensions.forEach((function(extension) {
                        if (getOptions()[extension]) showError("warn", "fullpage.js extensions require fullpage.extensions.min.js file instead of the usual fullpage.js. Requested: " + extension);
                    }));
                    getOptions().anchors.forEach((function(name) {
                        var nameAttr = [].slice.call($("[name]")).filter((function(item) {
                            return getAttr(item, "name") && getAttr(item, "name").toLowerCase() == name.toLowerCase();
                        }));
                        var idAttr = [].slice.call($("[id]")).filter((function(item) {
                            return getAttr(item, "id") && getAttr(item, "id").toLowerCase() == name.toLowerCase();
                        }));
                        if (idAttr.length || nameAttr.length) {
                            showError("error", "data-anchor tags can not have the same value as any `id` element on the site (or `name` element for IE).");
                            var propertyName = idAttr.length ? "id" : "name";
                            if (idAttr.length || nameAttr.length) showError("error", '"' + name + '" is is being used by another element `' + propertyName + "` property");
                        }
                    }));
                }
                function fullpage(containerSelector, options) {
                    setCache();
                    if (hasClass($html, ENABLED)) {
                        displayWarnings();
                        return;
                    }
                    setOption("touchWrapper", "string" === typeof containerSelector ? $(containerSelector)[0] : containerSelector);
                    setOptions(options);
                    setContainer("string" === typeof containerSelector ? $(containerSelector)[0] : containerSelector);
                    EventEmitter.emit(events.onInitialise);
                    displayWarnings();
                    setAPI();
                    if (getContainer()) {
                        EventEmitter.emit(events.beforeInit);
                        init();
                        EventEmitter.emit(events.bindEvents);
                    }
                    return win.fullpage_api;
                }
                function setAPI() {
                    FP.getFullpageData = function() {
                        return {
                            options: getOptions()
                        };
                    };
                    FP.version = "4.0.15";
                    FP.test = Object.assign(FP.test, {
                        top: "0px",
                        translate3d: "translate3d(0px, 0px, 0px)",
                        translate3dH: function() {
                            var a = [];
                            for (var i = 0; i < $(getOptions().sectionSelector, getContainer()).length; i++) a.push("translate3d(0px, 0px, 0px)");
                            return a;
                        }(),
                        left: function() {
                            var a = [];
                            for (var i = 0; i < $(getOptions().sectionSelector, getContainer()).length; i++) a.push(0);
                            return a;
                        }(),
                        options: getOptions(),
                        setAutoScrolling: null
                    });
                    FP.shared = Object.assign(FP.shared, {
                        afterRenderActions: null,
                        isNormalScrollElement: false
                    });
                    win.fullpage_api = FP;
                }
                win.fp_easings = deepExtend(win.fp_easings, {
                    easeInOutCubic: function easeInOutCubic(t, b, c, d) {
                        if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
                        return c / 2 * ((t -= 2) * t * t + 2) + b;
                    }
                });
                if (win.jQuery) (function($, fullpage) {
                    if (!$ || !fullpage) {
                        showError("error", "jQuery is required to use the jQuery fullpage adapter!");
                        return;
                    }
                    $.fn.fullpage = function(options) {
                        options = $.extend({}, options, {
                            $
                        });
                        new fullpage(this[0], options);
                        Object.keys(FP).forEach((function(key) {
                            getOptions().$.fn.fullpage[key] = FP[key];
                        }));
                    };
                })(win.jQuery, fullpage);
                return fullpage;
            }));
        }
    };
    var __webpack_module_cache__ = {};
    function __webpack_require__(moduleId) {
        var cachedModule = __webpack_module_cache__[moduleId];
        if (void 0 !== cachedModule) return cachedModule.exports;
        var module = __webpack_module_cache__[moduleId] = {
            exports: {}
        };
        __webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        return module.exports;
    }
    (() => {
        "use strict";
        const flsModules = {};
        function isWebp() {
            function testWebP(callback) {
                let webP = new Image;
                webP.onload = webP.onerror = function() {
                    callback(2 == webP.height);
                };
                webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
            }
            testWebP((function(support) {
                let className = true === support ? "webp" : "no-webp";
                document.documentElement.classList.add(className);
            }));
        }
        function functions_getHash() {
            if (location.hash) return location.hash.replace("#", "");
        }
        function setHash(hash) {
            hash = hash ? `#${hash}` : window.location.href.split("#")[0];
            history.pushState("", "", hash);
        }
        let _slideUp = (target, duration = 500, showmore = 0) => {
            if (!target.classList.contains("_slide")) {
                target.classList.add("_slide");
                target.style.transitionProperty = "height, margin, padding";
                target.style.transitionDuration = duration + "ms";
                target.style.height = `${target.offsetHeight}px`;
                target.offsetHeight;
                target.style.overflow = "hidden";
                target.style.height = showmore ? `${showmore}px` : `0px`;
                target.style.paddingTop = 0;
                target.style.paddingBottom = 0;
                target.style.marginTop = 0;
                target.style.marginBottom = 0;
                window.setTimeout((() => {
                    target.hidden = !showmore ? true : false;
                    !showmore ? target.style.removeProperty("height") : null;
                    target.style.removeProperty("padding-top");
                    target.style.removeProperty("padding-bottom");
                    target.style.removeProperty("margin-top");
                    target.style.removeProperty("margin-bottom");
                    !showmore ? target.style.removeProperty("overflow") : null;
                    target.style.removeProperty("transition-duration");
                    target.style.removeProperty("transition-property");
                    target.classList.remove("_slide");
                    document.dispatchEvent(new CustomEvent("slideUpDone", {
                        detail: {
                            target
                        }
                    }));
                }), duration);
            }
        };
        let _slideDown = (target, duration = 500, showmore = 0) => {
            if (!target.classList.contains("_slide")) {
                target.classList.add("_slide");
                target.hidden = target.hidden ? false : null;
                showmore ? target.style.removeProperty("height") : null;
                let height = target.offsetHeight;
                target.style.overflow = "hidden";
                target.style.height = showmore ? `${showmore}px` : `0px`;
                target.style.paddingTop = 0;
                target.style.paddingBottom = 0;
                target.style.marginTop = 0;
                target.style.marginBottom = 0;
                target.offsetHeight;
                target.style.transitionProperty = "height, margin, padding";
                target.style.transitionDuration = duration + "ms";
                target.style.height = height + "px";
                target.style.removeProperty("padding-top");
                target.style.removeProperty("padding-bottom");
                target.style.removeProperty("margin-top");
                target.style.removeProperty("margin-bottom");
                window.setTimeout((() => {
                    target.style.removeProperty("height");
                    target.style.removeProperty("overflow");
                    target.style.removeProperty("transition-duration");
                    target.style.removeProperty("transition-property");
                    target.classList.remove("_slide");
                    document.dispatchEvent(new CustomEvent("slideDownDone", {
                        detail: {
                            target
                        }
                    }));
                }), duration);
            }
        };
        let bodyLockStatus = true;
        let bodyLockToggle = (delay = 500) => {
            if (document.documentElement.classList.contains("lock")) bodyUnlock(delay); else bodyLock(delay);
        };
        let bodyUnlock = (delay = 500) => {
            let body = document.querySelector("body");
            if (bodyLockStatus) {
                let lock_padding = document.querySelectorAll("[data-lp]");
                setTimeout((() => {
                    for (let index = 0; index < lock_padding.length; index++) {
                        const el = lock_padding[index];
                        el.style.paddingRight = "0px";
                    }
                    body.style.paddingRight = "0px";
                    document.documentElement.classList.remove("lock");
                }), delay);
                bodyLockStatus = false;
                setTimeout((function() {
                    bodyLockStatus = true;
                }), delay);
            }
        };
        let bodyLock = (delay = 500) => {
            let body = document.querySelector("body");
            if (bodyLockStatus) {
                let lock_padding = document.querySelectorAll("[data-lp]");
                for (let index = 0; index < lock_padding.length; index++) {
                    const el = lock_padding[index];
                    el.style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
                }
                body.style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
                document.documentElement.classList.add("lock");
                bodyLockStatus = false;
                setTimeout((function() {
                    bodyLockStatus = true;
                }), delay);
            }
        };
        function tabs() {
            const tabs = document.querySelectorAll("[data-tabs]");
            let tabsActiveHash = [];
            if (tabs.length > 0) {
                const hash = functions_getHash();
                if (hash && hash.startsWith("tab-")) tabsActiveHash = hash.replace("tab-", "").split("-");
                tabs.forEach(((tabsBlock, index) => {
                    tabsBlock.classList.add("_tab-init");
                    tabsBlock.setAttribute("data-tabs-index", index);
                    tabsBlock.addEventListener("click", setTabsAction);
                    initTabs(tabsBlock);
                }));
                let mdQueriesArray = dataMediaQueries(tabs, "tabs");
                if (mdQueriesArray && mdQueriesArray.length) mdQueriesArray.forEach((mdQueriesItem => {
                    mdQueriesItem.matchMedia.addEventListener("change", (function() {
                        setTitlePosition(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
                    }));
                    setTitlePosition(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
                }));
            }
            function setTitlePosition(tabsMediaArray, matchMedia) {
                tabsMediaArray.forEach((tabsMediaItem => {
                    tabsMediaItem = tabsMediaItem.item;
                    let tabsTitles = tabsMediaItem.querySelector("[data-tabs-titles]");
                    let tabsTitleItems = tabsMediaItem.querySelectorAll("[data-tabs-title]");
                    let tabsContent = tabsMediaItem.querySelector("[data-tabs-body]");
                    let tabsContentItems = tabsMediaItem.querySelectorAll("[data-tabs-item]");
                    tabsTitleItems = Array.from(tabsTitleItems).filter((item => item.closest("[data-tabs]") === tabsMediaItem));
                    tabsContentItems = Array.from(tabsContentItems).filter((item => item.closest("[data-tabs]") === tabsMediaItem));
                    tabsContentItems.forEach(((tabsContentItem, index) => {
                        if (matchMedia.matches) {
                            tabsContent.append(tabsTitleItems[index]);
                            tabsContent.append(tabsContentItem);
                            tabsMediaItem.classList.add("_tab-spoller");
                        } else {
                            tabsTitles.append(tabsTitleItems[index]);
                            tabsMediaItem.classList.remove("_tab-spoller");
                        }
                    }));
                }));
            }
            function initTabs(tabsBlock) {
                let tabsTitles = tabsBlock.querySelectorAll("[data-tabs-titles]>*");
                let tabsContent = tabsBlock.querySelectorAll("[data-tabs-body]>*");
                const tabsBlockIndex = tabsBlock.dataset.tabsIndex;
                const tabsActiveHashBlock = tabsActiveHash[0] == tabsBlockIndex;
                if (tabsActiveHashBlock) {
                    const tabsActiveTitle = tabsBlock.querySelector("[data-tabs-titles]>._tab-active");
                    tabsActiveTitle ? tabsActiveTitle.classList.remove("_tab-active") : null;
                }
                if (tabsContent.length) {
                    tabsContent = Array.from(tabsContent).filter((item => item.closest("[data-tabs]") === tabsBlock));
                    tabsTitles = Array.from(tabsTitles).filter((item => item.closest("[data-tabs]") === tabsBlock));
                    tabsContent.forEach(((tabsContentItem, index) => {
                        tabsTitles[index].setAttribute("data-tabs-title", "");
                        tabsContentItem.setAttribute("data-tabs-item", "");
                        if (tabsActiveHashBlock && index == tabsActiveHash[1]) tabsTitles[index].classList.add("_tab-active");
                        tabsContentItem.hidden = !tabsTitles[index].classList.contains("_tab-active");
                    }));
                }
            }
            function setTabsStatus(tabsBlock) {
                let tabsTitles = tabsBlock.querySelectorAll("[data-tabs-title]");
                let tabsContent = tabsBlock.querySelectorAll("[data-tabs-item]");
                const tabsBlockIndex = tabsBlock.dataset.tabsIndex;
                function isTabsAnamate(tabsBlock) {
                    if (tabsBlock.hasAttribute("data-tabs-animate")) return tabsBlock.dataset.tabsAnimate > 0 ? Number(tabsBlock.dataset.tabsAnimate) : 500;
                }
                const tabsBlockAnimate = isTabsAnamate(tabsBlock);
                if (tabsContent.length > 0) {
                    const isHash = tabsBlock.hasAttribute("data-tabs-hash");
                    tabsContent = Array.from(tabsContent).filter((item => item.closest("[data-tabs]") === tabsBlock));
                    tabsTitles = Array.from(tabsTitles).filter((item => item.closest("[data-tabs]") === tabsBlock));
                    tabsContent.forEach(((tabsContentItem, index) => {
                        if (tabsTitles[index].classList.contains("_tab-active")) {
                            if (tabsBlockAnimate) _slideDown(tabsContentItem, tabsBlockAnimate); else tabsContentItem.hidden = false;
                            if (isHash && !tabsContentItem.closest(".popup")) setHash(`tab-${tabsBlockIndex}-${index}`);
                        } else if (tabsBlockAnimate) _slideUp(tabsContentItem, tabsBlockAnimate); else tabsContentItem.hidden = true;
                    }));
                }
            }
            function setTabsAction(e) {
                const el = e.target;
                if (el.closest("[data-tabs-title]")) {
                    const tabTitle = el.closest("[data-tabs-title]");
                    const tabsBlock = tabTitle.closest("[data-tabs]");
                    if (!tabTitle.classList.contains("_tab-active") && !tabsBlock.querySelector("._slide")) {
                        let tabActiveTitle = tabsBlock.querySelectorAll("[data-tabs-title]._tab-active");
                        tabActiveTitle.length ? tabActiveTitle = Array.from(tabActiveTitle).filter((item => item.closest("[data-tabs]") === tabsBlock)) : null;
                        tabActiveTitle.length ? tabActiveTitle[0].classList.remove("_tab-active") : null;
                        tabTitle.classList.add("_tab-active");
                        setTabsStatus(tabsBlock);
                    }
                    e.preventDefault();
                }
            }
        }
        function menuInit() {
            if (document.querySelector(".icon-menu")) document.addEventListener("click", (function(e) {
                if (bodyLockStatus && e.target.closest(".icon-menu")) {
                    bodyLockToggle();
                    document.documentElement.classList.toggle("menu-open");
                } else if ("menu__link" == e.target.className) document.documentElement.classList.remove("menu-open");
            }));
        }
        function menuClose() {
            bodyUnlock();
            document.documentElement.classList.remove("menu-open");
        }
        function FLS(message) {
            setTimeout((() => {
                if (window.FLS) console.log(message);
            }), 0);
        }
        function uniqArray(array) {
            return array.filter((function(item, index, self) {
                return self.indexOf(item) === index;
            }));
        }
        function dataMediaQueries(array, dataSetValue) {
            const media = Array.from(array).filter((function(item, index, self) {
                if (item.dataset[dataSetValue]) return item.dataset[dataSetValue].split(",")[0];
            }));
            if (media.length) {
                const breakpointsArray = [];
                media.forEach((item => {
                    const params = item.dataset[dataSetValue];
                    const breakpoint = {};
                    const paramsArray = params.split(",");
                    breakpoint.value = paramsArray[0];
                    breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
                    breakpoint.item = item;
                    breakpointsArray.push(breakpoint);
                }));
                let mdQueries = breakpointsArray.map((function(item) {
                    return "(" + item.type + "-width: " + item.value + "px)," + item.value + "," + item.type;
                }));
                mdQueries = uniqArray(mdQueries);
                const mdQueriesArray = [];
                if (mdQueries.length) {
                    mdQueries.forEach((breakpoint => {
                        const paramsArray = breakpoint.split(",");
                        const mediaBreakpoint = paramsArray[1];
                        const mediaType = paramsArray[2];
                        const matchMedia = window.matchMedia(paramsArray[0]);
                        const itemsArray = breakpointsArray.filter((function(item) {
                            if (item.value === mediaBreakpoint && item.type === mediaType) return true;
                        }));
                        mdQueriesArray.push({
                            itemsArray,
                            matchMedia
                        });
                    }));
                    return mdQueriesArray;
                }
            }
        }
        class Popup {
            constructor(options) {
                let config = {
                    logging: true,
                    init: true,
                    attributeOpenButton: "data-popup",
                    attributeCloseButton: "data-close",
                    fixElementSelector: "[data-lp]",
                    youtubeAttribute: "data-popup-youtube",
                    youtubePlaceAttribute: "data-popup-youtube-place",
                    setAutoplayYoutube: true,
                    classes: {
                        popup: "popup",
                        popupContent: "popup__content",
                        popupActive: "popup_show",
                        bodyActive: "popup-show"
                    },
                    focusCatch: true,
                    closeEsc: true,
                    bodyLock: true,
                    hashSettings: {
                        location: true,
                        goHash: true
                    },
                    on: {
                        beforeOpen: function() {},
                        afterOpen: function() {},
                        beforeClose: function() {},
                        afterClose: function() {}
                    }
                };
                this.youTubeCode;
                this.isOpen = false;
                this.targetOpen = {
                    selector: false,
                    element: false
                };
                this.previousOpen = {
                    selector: false,
                    element: false
                };
                this.lastClosed = {
                    selector: false,
                    element: false
                };
                this._dataValue = false;
                this.hash = false;
                this._reopen = false;
                this._selectorOpen = false;
                this.lastFocusEl = false;
                this._focusEl = [ "a[href]", 'input:not([disabled]):not([type="hidden"]):not([aria-hidden])', "button:not([disabled]):not([aria-hidden])", "select:not([disabled]):not([aria-hidden])", "textarea:not([disabled]):not([aria-hidden])", "area[href]", "iframe", "object", "embed", "[contenteditable]", '[tabindex]:not([tabindex^="-"])' ];
                this.options = {
                    ...config,
                    ...options,
                    classes: {
                        ...config.classes,
                        ...options?.classes
                    },
                    hashSettings: {
                        ...config.hashSettings,
                        ...options?.hashSettings
                    },
                    on: {
                        ...config.on,
                        ...options?.on
                    }
                };
                this.bodyLock = false;
                this.options.init ? this.initPopups() : null;
            }
            initPopups() {
                this.popupLogging(`Проснулся`);
                this.eventsPopup();
            }
            eventsPopup() {
                document.addEventListener("click", function(e) {
                    const buttonOpen = e.target.closest(`[${this.options.attributeOpenButton}]`);
                    if (buttonOpen) {
                        e.preventDefault();
                        this._dataValue = buttonOpen.getAttribute(this.options.attributeOpenButton) ? buttonOpen.getAttribute(this.options.attributeOpenButton) : "error";
                        this.youTubeCode = buttonOpen.getAttribute(this.options.youtubeAttribute) ? buttonOpen.getAttribute(this.options.youtubeAttribute) : null;
                        if ("error" !== this._dataValue) {
                            if (!this.isOpen) this.lastFocusEl = buttonOpen;
                            this.targetOpen.selector = `${this._dataValue}`;
                            this._selectorOpen = true;
                            this.open();
                            return;
                        } else this.popupLogging(`Ой ой, не заполнен атрибут у ${buttonOpen.classList}`);
                        return;
                    }
                    const buttonClose = e.target.closest(`[${this.options.attributeCloseButton}]`);
                    if (buttonClose || !e.target.closest(`.${this.options.classes.popupContent}`) && this.isOpen) {
                        e.preventDefault();
                        this.close();
                        return;
                    }
                }.bind(this));
                document.addEventListener("keydown", function(e) {
                    if (this.options.closeEsc && 27 == e.which && "Escape" === e.code && this.isOpen) {
                        e.preventDefault();
                        this.close();
                        return;
                    }
                    if (this.options.focusCatch && 9 == e.which && this.isOpen) {
                        this._focusCatch(e);
                        return;
                    }
                }.bind(this));
                if (this.options.hashSettings.goHash) {
                    window.addEventListener("hashchange", function() {
                        if (window.location.hash) this._openToHash(); else this.close(this.targetOpen.selector);
                    }.bind(this));
                    window.addEventListener("load", function() {
                        if (window.location.hash) this._openToHash();
                    }.bind(this));
                }
            }
            open(selectorValue) {
                if (bodyLockStatus) {
                    this.bodyLock = document.documentElement.classList.contains("lock") && !this.isOpen ? true : false;
                    if (selectorValue && "string" === typeof selectorValue && "" !== selectorValue.trim()) {
                        this.targetOpen.selector = selectorValue;
                        this._selectorOpen = true;
                    }
                    if (this.isOpen) {
                        this._reopen = true;
                        this.close();
                    }
                    if (!this._selectorOpen) this.targetOpen.selector = this.lastClosed.selector;
                    if (!this._reopen) this.previousActiveElement = document.activeElement;
                    this.targetOpen.element = document.querySelector(this.targetOpen.selector);
                    if (this.targetOpen.element) {
                        if (this.youTubeCode) {
                            const codeVideo = this.youTubeCode;
                            const urlVideo = `https://www.youtube.com/embed/${codeVideo}?rel=0&showinfo=0&autoplay=1`;
                            const iframe = document.createElement("iframe");
                            iframe.setAttribute("allowfullscreen", "");
                            const autoplay = this.options.setAutoplayYoutube ? "autoplay;" : "";
                            iframe.setAttribute("allow", `${autoplay}; encrypted-media`);
                            iframe.setAttribute("src", urlVideo);
                            if (!this.targetOpen.element.querySelector(`[${this.options.youtubePlaceAttribute}]`)) {
                                this.targetOpen.element.querySelector(".popup__text").setAttribute(`${this.options.youtubePlaceAttribute}`, "");
                            }
                            this.targetOpen.element.querySelector(`[${this.options.youtubePlaceAttribute}]`).appendChild(iframe);
                        }
                        if (this.options.hashSettings.location) {
                            this._getHash();
                            this._setHash();
                        }
                        this.options.on.beforeOpen(this);
                        document.dispatchEvent(new CustomEvent("beforePopupOpen", {
                            detail: {
                                popup: this
                            }
                        }));
                        this.targetOpen.element.classList.add(this.options.classes.popupActive);
                        document.documentElement.classList.add(this.options.classes.bodyActive);
                        if (!this._reopen) !this.bodyLock ? bodyLock() : null; else this._reopen = false;
                        this.targetOpen.element.setAttribute("aria-hidden", "false");
                        this.previousOpen.selector = this.targetOpen.selector;
                        this.previousOpen.element = this.targetOpen.element;
                        this._selectorOpen = false;
                        this.isOpen = true;
                        setTimeout((() => {
                            this._focusTrap();
                        }), 50);
                        this.options.on.afterOpen(this);
                        document.dispatchEvent(new CustomEvent("afterPopupOpen", {
                            detail: {
                                popup: this
                            }
                        }));
                        this.popupLogging(`Открыл попап`);
                    } else this.popupLogging(`Ой ой, такого попапа нет.Проверьте корректность ввода. `);
                }
            }
            close(selectorValue) {
                if (selectorValue && "string" === typeof selectorValue && "" !== selectorValue.trim()) this.previousOpen.selector = selectorValue;
                if (!this.isOpen || !bodyLockStatus) return;
                this.options.on.beforeClose(this);
                document.dispatchEvent(new CustomEvent("beforePopupClose", {
                    detail: {
                        popup: this
                    }
                }));
                if (this.youTubeCode) if (this.targetOpen.element.querySelector(`[${this.options.youtubePlaceAttribute}]`)) this.targetOpen.element.querySelector(`[${this.options.youtubePlaceAttribute}]`).innerHTML = "";
                this.previousOpen.element.classList.remove(this.options.classes.popupActive);
                this.previousOpen.element.setAttribute("aria-hidden", "true");
                if (!this._reopen) {
                    document.documentElement.classList.remove(this.options.classes.bodyActive);
                    !this.bodyLock ? bodyUnlock() : null;
                    this.isOpen = false;
                }
                this._removeHash();
                if (this._selectorOpen) {
                    this.lastClosed.selector = this.previousOpen.selector;
                    this.lastClosed.element = this.previousOpen.element;
                }
                this.options.on.afterClose(this);
                document.dispatchEvent(new CustomEvent("afterPopupClose", {
                    detail: {
                        popup: this
                    }
                }));
                setTimeout((() => {
                    this._focusTrap();
                }), 50);
                this.popupLogging(`Закрыл попап`);
            }
            _getHash() {
                if (this.options.hashSettings.location) this.hash = this.targetOpen.selector.includes("#") ? this.targetOpen.selector : this.targetOpen.selector.replace(".", "#");
            }
            _openToHash() {
                let classInHash = document.querySelector(`.${window.location.hash.replace("#", "")}`) ? `.${window.location.hash.replace("#", "")}` : document.querySelector(`${window.location.hash}`) ? `${window.location.hash}` : null;
                const buttons = document.querySelector(`[${this.options.attributeOpenButton} = "${classInHash}"]`) ? document.querySelector(`[${this.options.attributeOpenButton} = "${classInHash}"]`) : document.querySelector(`[${this.options.attributeOpenButton} = "${classInHash.replace(".", "#")}"]`);
                if (buttons && classInHash) this.open(classInHash);
            }
            _setHash() {
                history.pushState("", "", this.hash);
            }
            _removeHash() {
                history.pushState("", "", window.location.href.split("#")[0]);
            }
            _focusCatch(e) {
                const focusable = this.targetOpen.element.querySelectorAll(this._focusEl);
                const focusArray = Array.prototype.slice.call(focusable);
                const focusedIndex = focusArray.indexOf(document.activeElement);
                if (e.shiftKey && 0 === focusedIndex) {
                    focusArray[focusArray.length - 1].focus();
                    e.preventDefault();
                }
                if (!e.shiftKey && focusedIndex === focusArray.length - 1) {
                    focusArray[0].focus();
                    e.preventDefault();
                }
            }
            _focusTrap() {
                const focusable = this.previousOpen.element.querySelectorAll(this._focusEl);
                if (!this.isOpen && this.lastFocusEl) this.lastFocusEl.focus(); else focusable[0].focus();
            }
            popupLogging(message) {
                this.options.logging ? FLS(`[Попапос]: ${message}`) : null;
            }
        }
        flsModules.popup = new Popup({});
        let gotoblock_gotoBlock = (targetBlock, noHeader = false, speed = 500, offsetTop = 0) => {
            const targetBlockElement = document.querySelector(targetBlock);
            if (targetBlockElement) {
                let headerItem = "";
                let headerItemHeight = 0;
                if (noHeader) {
                    headerItem = "header.header";
                    headerItemHeight = document.querySelector(headerItem).offsetHeight;
                }
                let options = {
                    speedAsDuration: true,
                    speed,
                    header: headerItem,
                    offset: offsetTop,
                    easing: "easeOutQuad"
                };
                document.documentElement.classList.contains("menu-open") ? menuClose() : null;
                if ("undefined" !== typeof SmoothScroll) (new SmoothScroll).animateScroll(targetBlockElement, "", options); else {
                    let targetBlockElementPosition = targetBlockElement.getBoundingClientRect().top + scrollY;
                    targetBlockElementPosition = headerItemHeight ? targetBlockElementPosition - headerItemHeight : targetBlockElementPosition;
                    targetBlockElementPosition = offsetTop ? targetBlockElementPosition - offsetTop : targetBlockElementPosition;
                    window.scrollTo({
                        top: targetBlockElementPosition,
                        behavior: "smooth"
                    });
                }
                FLS(`[gotoBlock]: Юхуу...едем к ${targetBlock}`);
            } else FLS(`[gotoBlock]: Ой ой..Такого блока нет на странице: ${targetBlock}`);
        };
        function formFieldsInit(options = {
            viewPass: false
        }) {
            const formFields = document.querySelectorAll("input[placeholder],textarea[placeholder]");
            if (formFields.length) formFields.forEach((formField => {
                if (!formField.hasAttribute("data-placeholder-nohide")) formField.dataset.placeholder = formField.placeholder;
            }));
            document.body.addEventListener("focusin", (function(e) {
                const targetElement = e.target;
                if ("INPUT" === targetElement.tagName || "TEXTAREA" === targetElement.tagName) {
                    if (targetElement.dataset.placeholder) targetElement.placeholder = "";
                    if (!targetElement.hasAttribute("data-no-focus-classes")) {
                        targetElement.classList.add("_form-focus");
                        targetElement.parentElement.classList.add("_form-focus");
                    }
                    formValidate.removeError(targetElement);
                }
            }));
            document.body.addEventListener("focusout", (function(e) {
                const targetElement = e.target;
                if ("INPUT" === targetElement.tagName || "TEXTAREA" === targetElement.tagName) {
                    if (targetElement.dataset.placeholder) targetElement.placeholder = targetElement.dataset.placeholder;
                    if (!targetElement.hasAttribute("data-no-focus-classes")) {
                        targetElement.classList.remove("_form-focus");
                        targetElement.parentElement.classList.remove("_form-focus");
                    }
                    if (targetElement.hasAttribute("data-validate")) formValidate.validateInput(targetElement);
                }
            }));
            if (options.viewPass) document.addEventListener("click", (function(e) {
                let targetElement = e.target;
                if (targetElement.closest('[class*="__viewpass"]')) {
                    let inputType = targetElement.classList.contains("_viewpass-active") ? "password" : "text";
                    targetElement.parentElement.querySelector("input").setAttribute("type", inputType);
                    targetElement.classList.toggle("_viewpass-active");
                }
            }));
        }
        let formValidate = {
            getErrors(form) {
                let error = 0;
                let formRequiredItems = form.querySelectorAll("*[data-required]");
                if (formRequiredItems.length) formRequiredItems.forEach((formRequiredItem => {
                    if ((null !== formRequiredItem.offsetParent || "SELECT" === formRequiredItem.tagName) && !formRequiredItem.disabled) error += this.validateInput(formRequiredItem);
                }));
                return error;
            },
            validateInput(formRequiredItem) {
                let error = 0;
                if ("email" === formRequiredItem.dataset.required) {
                    formRequiredItem.value = formRequiredItem.value.replace(" ", "");
                    if (this.emailTest(formRequiredItem)) {
                        this.addError(formRequiredItem);
                        error++;
                    } else this.removeError(formRequiredItem);
                } else if ("checkbox" === formRequiredItem.type && !formRequiredItem.checked) {
                    this.addError(formRequiredItem);
                    error++;
                } else if (!formRequiredItem.value.trim()) {
                    this.addError(formRequiredItem);
                    error++;
                } else this.removeError(formRequiredItem);
                return error;
            },
            addError(formRequiredItem) {
                formRequiredItem.classList.add("_form-error");
                formRequiredItem.parentElement.classList.add("_form-error");
                let inputError = formRequiredItem.parentElement.querySelector(".form__error");
                if (inputError) formRequiredItem.parentElement.removeChild(inputError);
                if (formRequiredItem.dataset.error) formRequiredItem.parentElement.insertAdjacentHTML("beforeend", `<div class="form__error">${formRequiredItem.dataset.error}</div>`);
            },
            removeError(formRequiredItem) {
                formRequiredItem.classList.remove("_form-error");
                formRequiredItem.parentElement.classList.remove("_form-error");
                if (formRequiredItem.parentElement.querySelector(".form__error")) formRequiredItem.parentElement.removeChild(formRequiredItem.parentElement.querySelector(".form__error"));
            },
            formClean(form) {
                form.reset();
                setTimeout((() => {
                    let inputs = form.querySelectorAll("input,textarea");
                    for (let index = 0; index < inputs.length; index++) {
                        const el = inputs[index];
                        el.parentElement.classList.remove("_form-focus");
                        el.classList.remove("_form-focus");
                        formValidate.removeError(el);
                    }
                    let checkboxes = form.querySelectorAll(".checkbox__input");
                    if (checkboxes.length > 0) for (let index = 0; index < checkboxes.length; index++) {
                        const checkbox = checkboxes[index];
                        checkbox.checked = false;
                    }
                    if (flsModules.select) {
                        let selects = form.querySelectorAll(".select");
                        if (selects.length) for (let index = 0; index < selects.length; index++) {
                            const select = selects[index].querySelector("select");
                            flsModules.select.selectBuild(select);
                        }
                    }
                }), 0);
            },
            emailTest(formRequiredItem) {
                return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(formRequiredItem.value);
            }
        };
        function formSubmit(options = {
            validate: true
        }) {
            const forms = document.forms;
            if (forms.length) for (const form of forms) {
                form.addEventListener("submit", (function(e) {
                    const form = e.target;
                    formSubmitAction(form, e);
                }));
                form.addEventListener("reset", (function(e) {
                    const form = e.target;
                    formValidate.formClean(form);
                }));
            }
            async function formSubmitAction(form, e) {
                const error = !form.hasAttribute("data-no-validate") ? formValidate.getErrors(form) : 0;
                if (0 === error) {
                    const ajax = form.hasAttribute("data-ajax");
                    if (ajax) {
                        e.preventDefault();
                        const formAction = form.getAttribute("action") ? form.getAttribute("action").trim() : "#";
                        const formMethod = form.getAttribute("method") ? form.getAttribute("method").trim() : "GET";
                        const formData = new FormData(form);
                        form.classList.add("_sending");
                        const response = await fetch(formAction, {
                            method: formMethod,
                            body: formData
                        });
                        if (response.ok) {
                            let responseResult = await response.json();
                            form.classList.remove("_sending");
                            formSent(form, responseResult);
                        } else {
                            alert("Ошибка");
                            form.classList.remove("_sending");
                        }
                    } else if (form.hasAttribute("data-dev")) {
                        e.preventDefault();
                        formSent(form);
                    }
                } else {
                    e.preventDefault();
                    const formError = form.querySelector("._form-error");
                    if (formError && form.hasAttribute("data-goto-error")) gotoblock_gotoBlock(formError, true, 1e3);
                }
            }
            function formSent(form, responseResult = ``) {
                document.dispatchEvent(new CustomEvent("formSent", {
                    detail: {
                        form
                    }
                }));
                setTimeout((() => {
                    if (flsModules.popup) {
                        const popup = form.dataset.popupMessage;
                        popup ? flsModules.popup.open(popup) : null;
                    }
                }), 0);
                formValidate.formClean(form);
                formLogging(`Форма отправлена!`);
            }
            function formLogging(message) {
                FLS(`[Формы]: ${message}`);
            }
        }
        function ssr_window_esm_isObject(obj) {
            return null !== obj && "object" === typeof obj && "constructor" in obj && obj.constructor === Object;
        }
        function extend(target = {}, src = {}) {
            Object.keys(src).forEach((key => {
                if ("undefined" === typeof target[key]) target[key] = src[key]; else if (ssr_window_esm_isObject(src[key]) && ssr_window_esm_isObject(target[key]) && Object.keys(src[key]).length > 0) extend(target[key], src[key]);
            }));
        }
        const ssrDocument = {
            body: {},
            addEventListener() {},
            removeEventListener() {},
            activeElement: {
                blur() {},
                nodeName: ""
            },
            querySelector() {
                return null;
            },
            querySelectorAll() {
                return [];
            },
            getElementById() {
                return null;
            },
            createEvent() {
                return {
                    initEvent() {}
                };
            },
            createElement() {
                return {
                    children: [],
                    childNodes: [],
                    style: {},
                    setAttribute() {},
                    getElementsByTagName() {
                        return [];
                    }
                };
            },
            createElementNS() {
                return {};
            },
            importNode() {
                return null;
            },
            location: {
                hash: "",
                host: "",
                hostname: "",
                href: "",
                origin: "",
                pathname: "",
                protocol: "",
                search: ""
            }
        };
        function ssr_window_esm_getDocument() {
            const doc = "undefined" !== typeof document ? document : {};
            extend(doc, ssrDocument);
            return doc;
        }
        const ssrWindow = {
            document: ssrDocument,
            navigator: {
                userAgent: ""
            },
            location: {
                hash: "",
                host: "",
                hostname: "",
                href: "",
                origin: "",
                pathname: "",
                protocol: "",
                search: ""
            },
            history: {
                replaceState() {},
                pushState() {},
                go() {},
                back() {}
            },
            CustomEvent: function CustomEvent() {
                return this;
            },
            addEventListener() {},
            removeEventListener() {},
            getComputedStyle() {
                return {
                    getPropertyValue() {
                        return "";
                    }
                };
            },
            Image() {},
            Date() {},
            screen: {},
            setTimeout() {},
            clearTimeout() {},
            matchMedia() {
                return {};
            },
            requestAnimationFrame(callback) {
                if ("undefined" === typeof setTimeout) {
                    callback();
                    return null;
                }
                return setTimeout(callback, 0);
            },
            cancelAnimationFrame(id) {
                if ("undefined" === typeof setTimeout) return;
                clearTimeout(id);
            }
        };
        function ssr_window_esm_getWindow() {
            const win = "undefined" !== typeof window ? window : {};
            extend(win, ssrWindow);
            return win;
        }
        function makeReactive(obj) {
            const proto = obj.__proto__;
            Object.defineProperty(obj, "__proto__", {
                get() {
                    return proto;
                },
                set(value) {
                    proto.__proto__ = value;
                }
            });
        }
        class Dom7 extends Array {
            constructor(items) {
                if ("number" === typeof items) super(items); else {
                    super(...items || []);
                    makeReactive(this);
                }
            }
        }
        function arrayFlat(arr = []) {
            const res = [];
            arr.forEach((el => {
                if (Array.isArray(el)) res.push(...arrayFlat(el)); else res.push(el);
            }));
            return res;
        }
        function arrayFilter(arr, callback) {
            return Array.prototype.filter.call(arr, callback);
        }
        function arrayUnique(arr) {
            const uniqueArray = [];
            for (let i = 0; i < arr.length; i += 1) if (-1 === uniqueArray.indexOf(arr[i])) uniqueArray.push(arr[i]);
            return uniqueArray;
        }
        function qsa(selector, context) {
            if ("string" !== typeof selector) return [ selector ];
            const a = [];
            const res = context.querySelectorAll(selector);
            for (let i = 0; i < res.length; i += 1) a.push(res[i]);
            return a;
        }
        function dom7_esm_$(selector, context) {
            const window = ssr_window_esm_getWindow();
            const document = ssr_window_esm_getDocument();
            let arr = [];
            if (!context && selector instanceof Dom7) return selector;
            if (!selector) return new Dom7(arr);
            if ("string" === typeof selector) {
                const html = selector.trim();
                if (html.indexOf("<") >= 0 && html.indexOf(">") >= 0) {
                    let toCreate = "div";
                    if (0 === html.indexOf("<li")) toCreate = "ul";
                    if (0 === html.indexOf("<tr")) toCreate = "tbody";
                    if (0 === html.indexOf("<td") || 0 === html.indexOf("<th")) toCreate = "tr";
                    if (0 === html.indexOf("<tbody")) toCreate = "table";
                    if (0 === html.indexOf("<option")) toCreate = "select";
                    const tempParent = document.createElement(toCreate);
                    tempParent.innerHTML = html;
                    for (let i = 0; i < tempParent.childNodes.length; i += 1) arr.push(tempParent.childNodes[i]);
                } else arr = qsa(selector.trim(), context || document);
            } else if (selector.nodeType || selector === window || selector === document) arr.push(selector); else if (Array.isArray(selector)) {
                if (selector instanceof Dom7) return selector;
                arr = selector;
            }
            return new Dom7(arrayUnique(arr));
        }
        dom7_esm_$.fn = Dom7.prototype;
        function addClass(...classes) {
            const classNames = arrayFlat(classes.map((c => c.split(" "))));
            this.forEach((el => {
                el.classList.add(...classNames);
            }));
            return this;
        }
        function removeClass(...classes) {
            const classNames = arrayFlat(classes.map((c => c.split(" "))));
            this.forEach((el => {
                el.classList.remove(...classNames);
            }));
            return this;
        }
        function toggleClass(...classes) {
            const classNames = arrayFlat(classes.map((c => c.split(" "))));
            this.forEach((el => {
                classNames.forEach((className => {
                    el.classList.toggle(className);
                }));
            }));
        }
        function hasClass(...classes) {
            const classNames = arrayFlat(classes.map((c => c.split(" "))));
            return arrayFilter(this, (el => classNames.filter((className => el.classList.contains(className))).length > 0)).length > 0;
        }
        function attr(attrs, value) {
            if (1 === arguments.length && "string" === typeof attrs) {
                if (this[0]) return this[0].getAttribute(attrs);
                return;
            }
            for (let i = 0; i < this.length; i += 1) if (2 === arguments.length) this[i].setAttribute(attrs, value); else for (const attrName in attrs) {
                this[i][attrName] = attrs[attrName];
                this[i].setAttribute(attrName, attrs[attrName]);
            }
            return this;
        }
        function removeAttr(attr) {
            for (let i = 0; i < this.length; i += 1) this[i].removeAttribute(attr);
            return this;
        }
        function transform(transform) {
            for (let i = 0; i < this.length; i += 1) this[i].style.transform = transform;
            return this;
        }
        function transition(duration) {
            for (let i = 0; i < this.length; i += 1) this[i].style.transitionDuration = "string" !== typeof duration ? `${duration}ms` : duration;
            return this;
        }
        function on(...args) {
            let [eventType, targetSelector, listener, capture] = args;
            if ("function" === typeof args[1]) {
                [eventType, listener, capture] = args;
                targetSelector = void 0;
            }
            if (!capture) capture = false;
            function handleLiveEvent(e) {
                const target = e.target;
                if (!target) return;
                const eventData = e.target.dom7EventData || [];
                if (eventData.indexOf(e) < 0) eventData.unshift(e);
                if (dom7_esm_$(target).is(targetSelector)) listener.apply(target, eventData); else {
                    const parents = dom7_esm_$(target).parents();
                    for (let k = 0; k < parents.length; k += 1) if (dom7_esm_$(parents[k]).is(targetSelector)) listener.apply(parents[k], eventData);
                }
            }
            function handleEvent(e) {
                const eventData = e && e.target ? e.target.dom7EventData || [] : [];
                if (eventData.indexOf(e) < 0) eventData.unshift(e);
                listener.apply(this, eventData);
            }
            const events = eventType.split(" ");
            let j;
            for (let i = 0; i < this.length; i += 1) {
                const el = this[i];
                if (!targetSelector) for (j = 0; j < events.length; j += 1) {
                    const event = events[j];
                    if (!el.dom7Listeners) el.dom7Listeners = {};
                    if (!el.dom7Listeners[event]) el.dom7Listeners[event] = [];
                    el.dom7Listeners[event].push({
                        listener,
                        proxyListener: handleEvent
                    });
                    el.addEventListener(event, handleEvent, capture);
                } else for (j = 0; j < events.length; j += 1) {
                    const event = events[j];
                    if (!el.dom7LiveListeners) el.dom7LiveListeners = {};
                    if (!el.dom7LiveListeners[event]) el.dom7LiveListeners[event] = [];
                    el.dom7LiveListeners[event].push({
                        listener,
                        proxyListener: handleLiveEvent
                    });
                    el.addEventListener(event, handleLiveEvent, capture);
                }
            }
            return this;
        }
        function off(...args) {
            let [eventType, targetSelector, listener, capture] = args;
            if ("function" === typeof args[1]) {
                [eventType, listener, capture] = args;
                targetSelector = void 0;
            }
            if (!capture) capture = false;
            const events = eventType.split(" ");
            for (let i = 0; i < events.length; i += 1) {
                const event = events[i];
                for (let j = 0; j < this.length; j += 1) {
                    const el = this[j];
                    let handlers;
                    if (!targetSelector && el.dom7Listeners) handlers = el.dom7Listeners[event]; else if (targetSelector && el.dom7LiveListeners) handlers = el.dom7LiveListeners[event];
                    if (handlers && handlers.length) for (let k = handlers.length - 1; k >= 0; k -= 1) {
                        const handler = handlers[k];
                        if (listener && handler.listener === listener) {
                            el.removeEventListener(event, handler.proxyListener, capture);
                            handlers.splice(k, 1);
                        } else if (listener && handler.listener && handler.listener.dom7proxy && handler.listener.dom7proxy === listener) {
                            el.removeEventListener(event, handler.proxyListener, capture);
                            handlers.splice(k, 1);
                        } else if (!listener) {
                            el.removeEventListener(event, handler.proxyListener, capture);
                            handlers.splice(k, 1);
                        }
                    }
                }
            }
            return this;
        }
        function trigger(...args) {
            const window = ssr_window_esm_getWindow();
            const events = args[0].split(" ");
            const eventData = args[1];
            for (let i = 0; i < events.length; i += 1) {
                const event = events[i];
                for (let j = 0; j < this.length; j += 1) {
                    const el = this[j];
                    if (window.CustomEvent) {
                        const evt = new window.CustomEvent(event, {
                            detail: eventData,
                            bubbles: true,
                            cancelable: true
                        });
                        el.dom7EventData = args.filter(((data, dataIndex) => dataIndex > 0));
                        el.dispatchEvent(evt);
                        el.dom7EventData = [];
                        delete el.dom7EventData;
                    }
                }
            }
            return this;
        }
        function transitionEnd(callback) {
            const dom = this;
            function fireCallBack(e) {
                if (e.target !== this) return;
                callback.call(this, e);
                dom.off("transitionend", fireCallBack);
            }
            if (callback) dom.on("transitionend", fireCallBack);
            return this;
        }
        function dom7_esm_outerWidth(includeMargins) {
            if (this.length > 0) {
                if (includeMargins) {
                    const styles = this.styles();
                    return this[0].offsetWidth + parseFloat(styles.getPropertyValue("margin-right")) + parseFloat(styles.getPropertyValue("margin-left"));
                }
                return this[0].offsetWidth;
            }
            return null;
        }
        function dom7_esm_outerHeight(includeMargins) {
            if (this.length > 0) {
                if (includeMargins) {
                    const styles = this.styles();
                    return this[0].offsetHeight + parseFloat(styles.getPropertyValue("margin-top")) + parseFloat(styles.getPropertyValue("margin-bottom"));
                }
                return this[0].offsetHeight;
            }
            return null;
        }
        function offset() {
            if (this.length > 0) {
                const window = ssr_window_esm_getWindow();
                const document = ssr_window_esm_getDocument();
                const el = this[0];
                const box = el.getBoundingClientRect();
                const body = document.body;
                const clientTop = el.clientTop || body.clientTop || 0;
                const clientLeft = el.clientLeft || body.clientLeft || 0;
                const scrollTop = el === window ? window.scrollY : el.scrollTop;
                const scrollLeft = el === window ? window.scrollX : el.scrollLeft;
                return {
                    top: box.top + scrollTop - clientTop,
                    left: box.left + scrollLeft - clientLeft
                };
            }
            return null;
        }
        function styles() {
            const window = ssr_window_esm_getWindow();
            if (this[0]) return window.getComputedStyle(this[0], null);
            return {};
        }
        function css(props, value) {
            const window = ssr_window_esm_getWindow();
            let i;
            if (1 === arguments.length) if ("string" === typeof props) {
                if (this[0]) return window.getComputedStyle(this[0], null).getPropertyValue(props);
            } else {
                for (i = 0; i < this.length; i += 1) for (const prop in props) this[i].style[prop] = props[prop];
                return this;
            }
            if (2 === arguments.length && "string" === typeof props) {
                for (i = 0; i < this.length; i += 1) this[i].style[props] = value;
                return this;
            }
            return this;
        }
        function each(callback) {
            if (!callback) return this;
            this.forEach(((el, index) => {
                callback.apply(el, [ el, index ]);
            }));
            return this;
        }
        function filter(callback) {
            const result = arrayFilter(this, callback);
            return dom7_esm_$(result);
        }
        function html(html) {
            if ("undefined" === typeof html) return this[0] ? this[0].innerHTML : null;
            for (let i = 0; i < this.length; i += 1) this[i].innerHTML = html;
            return this;
        }
        function dom7_esm_text(text) {
            if ("undefined" === typeof text) return this[0] ? this[0].textContent.trim() : null;
            for (let i = 0; i < this.length; i += 1) this[i].textContent = text;
            return this;
        }
        function is(selector) {
            const window = ssr_window_esm_getWindow();
            const document = ssr_window_esm_getDocument();
            const el = this[0];
            let compareWith;
            let i;
            if (!el || "undefined" === typeof selector) return false;
            if ("string" === typeof selector) {
                if (el.matches) return el.matches(selector);
                if (el.webkitMatchesSelector) return el.webkitMatchesSelector(selector);
                if (el.msMatchesSelector) return el.msMatchesSelector(selector);
                compareWith = dom7_esm_$(selector);
                for (i = 0; i < compareWith.length; i += 1) if (compareWith[i] === el) return true;
                return false;
            }
            if (selector === document) return el === document;
            if (selector === window) return el === window;
            if (selector.nodeType || selector instanceof Dom7) {
                compareWith = selector.nodeType ? [ selector ] : selector;
                for (i = 0; i < compareWith.length; i += 1) if (compareWith[i] === el) return true;
                return false;
            }
            return false;
        }
        function index() {
            let child = this[0];
            let i;
            if (child) {
                i = 0;
                while (null !== (child = child.previousSibling)) if (1 === child.nodeType) i += 1;
                return i;
            }
            return;
        }
        function eq(index) {
            if ("undefined" === typeof index) return this;
            const length = this.length;
            if (index > length - 1) return dom7_esm_$([]);
            if (index < 0) {
                const returnIndex = length + index;
                if (returnIndex < 0) return dom7_esm_$([]);
                return dom7_esm_$([ this[returnIndex] ]);
            }
            return dom7_esm_$([ this[index] ]);
        }
        function append(...els) {
            let newChild;
            const document = ssr_window_esm_getDocument();
            for (let k = 0; k < els.length; k += 1) {
                newChild = els[k];
                for (let i = 0; i < this.length; i += 1) if ("string" === typeof newChild) {
                    const tempDiv = document.createElement("div");
                    tempDiv.innerHTML = newChild;
                    while (tempDiv.firstChild) this[i].appendChild(tempDiv.firstChild);
                } else if (newChild instanceof Dom7) for (let j = 0; j < newChild.length; j += 1) this[i].appendChild(newChild[j]); else this[i].appendChild(newChild);
            }
            return this;
        }
        function prepend(newChild) {
            const document = ssr_window_esm_getDocument();
            let i;
            let j;
            for (i = 0; i < this.length; i += 1) if ("string" === typeof newChild) {
                const tempDiv = document.createElement("div");
                tempDiv.innerHTML = newChild;
                for (j = tempDiv.childNodes.length - 1; j >= 0; j -= 1) this[i].insertBefore(tempDiv.childNodes[j], this[i].childNodes[0]);
            } else if (newChild instanceof Dom7) for (j = 0; j < newChild.length; j += 1) this[i].insertBefore(newChild[j], this[i].childNodes[0]); else this[i].insertBefore(newChild, this[i].childNodes[0]);
            return this;
        }
        function next(selector) {
            if (this.length > 0) {
                if (selector) {
                    if (this[0].nextElementSibling && dom7_esm_$(this[0].nextElementSibling).is(selector)) return dom7_esm_$([ this[0].nextElementSibling ]);
                    return dom7_esm_$([]);
                }
                if (this[0].nextElementSibling) return dom7_esm_$([ this[0].nextElementSibling ]);
                return dom7_esm_$([]);
            }
            return dom7_esm_$([]);
        }
        function nextAll(selector) {
            const nextEls = [];
            let el = this[0];
            if (!el) return dom7_esm_$([]);
            while (el.nextElementSibling) {
                const next = el.nextElementSibling;
                if (selector) {
                    if (dom7_esm_$(next).is(selector)) nextEls.push(next);
                } else nextEls.push(next);
                el = next;
            }
            return dom7_esm_$(nextEls);
        }
        function prev(selector) {
            if (this.length > 0) {
                const el = this[0];
                if (selector) {
                    if (el.previousElementSibling && dom7_esm_$(el.previousElementSibling).is(selector)) return dom7_esm_$([ el.previousElementSibling ]);
                    return dom7_esm_$([]);
                }
                if (el.previousElementSibling) return dom7_esm_$([ el.previousElementSibling ]);
                return dom7_esm_$([]);
            }
            return dom7_esm_$([]);
        }
        function prevAll(selector) {
            const prevEls = [];
            let el = this[0];
            if (!el) return dom7_esm_$([]);
            while (el.previousElementSibling) {
                const prev = el.previousElementSibling;
                if (selector) {
                    if (dom7_esm_$(prev).is(selector)) prevEls.push(prev);
                } else prevEls.push(prev);
                el = prev;
            }
            return dom7_esm_$(prevEls);
        }
        function dom7_esm_parent(selector) {
            const parents = [];
            for (let i = 0; i < this.length; i += 1) if (null !== this[i].parentNode) if (selector) {
                if (dom7_esm_$(this[i].parentNode).is(selector)) parents.push(this[i].parentNode);
            } else parents.push(this[i].parentNode);
            return dom7_esm_$(parents);
        }
        function parents(selector) {
            const parents = [];
            for (let i = 0; i < this.length; i += 1) {
                let parent = this[i].parentNode;
                while (parent) {
                    if (selector) {
                        if (dom7_esm_$(parent).is(selector)) parents.push(parent);
                    } else parents.push(parent);
                    parent = parent.parentNode;
                }
            }
            return dom7_esm_$(parents);
        }
        function closest(selector) {
            let closest = this;
            if ("undefined" === typeof selector) return dom7_esm_$([]);
            if (!closest.is(selector)) closest = closest.parents(selector).eq(0);
            return closest;
        }
        function find(selector) {
            const foundElements = [];
            for (let i = 0; i < this.length; i += 1) {
                const found = this[i].querySelectorAll(selector);
                for (let j = 0; j < found.length; j += 1) foundElements.push(found[j]);
            }
            return dom7_esm_$(foundElements);
        }
        function children(selector) {
            const children = [];
            for (let i = 0; i < this.length; i += 1) {
                const childNodes = this[i].children;
                for (let j = 0; j < childNodes.length; j += 1) if (!selector || dom7_esm_$(childNodes[j]).is(selector)) children.push(childNodes[j]);
            }
            return dom7_esm_$(children);
        }
        function remove() {
            for (let i = 0; i < this.length; i += 1) if (this[i].parentNode) this[i].parentNode.removeChild(this[i]);
            return this;
        }
        const noTrigger = "resize scroll".split(" ");
        function shortcut(name) {
            function eventHandler(...args) {
                if ("undefined" === typeof args[0]) {
                    for (let i = 0; i < this.length; i += 1) if (noTrigger.indexOf(name) < 0) if (name in this[i]) this[i][name](); else dom7_esm_$(this[i]).trigger(name);
                    return this;
                }
                return this.on(name, ...args);
            }
            return eventHandler;
        }
        shortcut("click");
        shortcut("blur");
        shortcut("focus");
        shortcut("focusin");
        shortcut("focusout");
        shortcut("keyup");
        shortcut("keydown");
        shortcut("keypress");
        shortcut("submit");
        shortcut("change");
        shortcut("mousedown");
        shortcut("mousemove");
        shortcut("mouseup");
        shortcut("mouseenter");
        shortcut("mouseleave");
        shortcut("mouseout");
        shortcut("mouseover");
        shortcut("touchstart");
        shortcut("touchend");
        shortcut("touchmove");
        shortcut("resize");
        shortcut("scroll");
        const Methods = {
            addClass,
            removeClass,
            hasClass,
            toggleClass,
            attr,
            removeAttr,
            transform,
            transition,
            on,
            off,
            trigger,
            transitionEnd,
            outerWidth: dom7_esm_outerWidth,
            outerHeight: dom7_esm_outerHeight,
            styles,
            offset,
            css,
            each,
            html,
            text: dom7_esm_text,
            is,
            index,
            eq,
            append,
            prepend,
            next,
            nextAll,
            prev,
            prevAll,
            parent: dom7_esm_parent,
            parents,
            closest,
            find,
            children,
            filter,
            remove
        };
        Object.keys(Methods).forEach((methodName => {
            Object.defineProperty(dom7_esm_$.fn, methodName, {
                value: Methods[methodName],
                writable: true
            });
        }));
        const dom = dom7_esm_$;
        function deleteProps(obj) {
            const object = obj;
            Object.keys(object).forEach((key => {
                try {
                    object[key] = null;
                } catch (e) {}
                try {
                    delete object[key];
                } catch (e) {}
            }));
        }
        function utils_nextTick(callback, delay = 0) {
            return setTimeout(callback, delay);
        }
        function utils_now() {
            return Date.now();
        }
        function utils_getComputedStyle(el) {
            const window = ssr_window_esm_getWindow();
            let style;
            if (window.getComputedStyle) style = window.getComputedStyle(el, null);
            if (!style && el.currentStyle) style = el.currentStyle;
            if (!style) style = el.style;
            return style;
        }
        function utils_getTranslate(el, axis = "x") {
            const window = ssr_window_esm_getWindow();
            let matrix;
            let curTransform;
            let transformMatrix;
            const curStyle = utils_getComputedStyle(el, null);
            if (window.WebKitCSSMatrix) {
                curTransform = curStyle.transform || curStyle.webkitTransform;
                if (curTransform.split(",").length > 6) curTransform = curTransform.split(", ").map((a => a.replace(",", "."))).join(", ");
                transformMatrix = new window.WebKitCSSMatrix("none" === curTransform ? "" : curTransform);
            } else {
                transformMatrix = curStyle.MozTransform || curStyle.OTransform || curStyle.MsTransform || curStyle.msTransform || curStyle.transform || curStyle.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,");
                matrix = transformMatrix.toString().split(",");
            }
            if ("x" === axis) if (window.WebKitCSSMatrix) curTransform = transformMatrix.m41; else if (16 === matrix.length) curTransform = parseFloat(matrix[12]); else curTransform = parseFloat(matrix[4]);
            if ("y" === axis) if (window.WebKitCSSMatrix) curTransform = transformMatrix.m42; else if (16 === matrix.length) curTransform = parseFloat(matrix[13]); else curTransform = parseFloat(matrix[5]);
            return curTransform || 0;
        }
        function utils_isObject(o) {
            return "object" === typeof o && null !== o && o.constructor && "Object" === Object.prototype.toString.call(o).slice(8, -1);
        }
        function isNode(node) {
            if ("undefined" !== typeof window && "undefined" !== typeof window.HTMLElement) return node instanceof HTMLElement;
            return node && (1 === node.nodeType || 11 === node.nodeType);
        }
        function utils_extend(...args) {
            const to = Object(args[0]);
            const noExtend = [ "__proto__", "constructor", "prototype" ];
            for (let i = 1; i < args.length; i += 1) {
                const nextSource = args[i];
                if (void 0 !== nextSource && null !== nextSource && !isNode(nextSource)) {
                    const keysArray = Object.keys(Object(nextSource)).filter((key => noExtend.indexOf(key) < 0));
                    for (let nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex += 1) {
                        const nextKey = keysArray[nextIndex];
                        const desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
                        if (void 0 !== desc && desc.enumerable) if (utils_isObject(to[nextKey]) && utils_isObject(nextSource[nextKey])) if (nextSource[nextKey].__swiper__) to[nextKey] = nextSource[nextKey]; else utils_extend(to[nextKey], nextSource[nextKey]); else if (!utils_isObject(to[nextKey]) && utils_isObject(nextSource[nextKey])) {
                            to[nextKey] = {};
                            if (nextSource[nextKey].__swiper__) to[nextKey] = nextSource[nextKey]; else utils_extend(to[nextKey], nextSource[nextKey]);
                        } else to[nextKey] = nextSource[nextKey];
                    }
                }
            }
            return to;
        }
        function utils_setCSSProperty(el, varName, varValue) {
            el.style.setProperty(varName, varValue);
        }
        function animateCSSModeScroll({swiper, targetPosition, side}) {
            const window = ssr_window_esm_getWindow();
            const startPosition = -swiper.translate;
            let startTime = null;
            let time;
            const duration = swiper.params.speed;
            swiper.wrapperEl.style.scrollSnapType = "none";
            window.cancelAnimationFrame(swiper.cssModeFrameID);
            const dir = targetPosition > startPosition ? "next" : "prev";
            const isOutOfBound = (current, target) => "next" === dir && current >= target || "prev" === dir && current <= target;
            const animate = () => {
                time = (new Date).getTime();
                if (null === startTime) startTime = time;
                const progress = Math.max(Math.min((time - startTime) / duration, 1), 0);
                const easeProgress = .5 - Math.cos(progress * Math.PI) / 2;
                let currentPosition = startPosition + easeProgress * (targetPosition - startPosition);
                if (isOutOfBound(currentPosition, targetPosition)) currentPosition = targetPosition;
                swiper.wrapperEl.scrollTo({
                    [side]: currentPosition
                });
                if (isOutOfBound(currentPosition, targetPosition)) {
                    swiper.wrapperEl.style.overflow = "hidden";
                    swiper.wrapperEl.style.scrollSnapType = "";
                    setTimeout((() => {
                        swiper.wrapperEl.style.overflow = "";
                        swiper.wrapperEl.scrollTo({
                            [side]: currentPosition
                        });
                    }));
                    window.cancelAnimationFrame(swiper.cssModeFrameID);
                    return;
                }
                swiper.cssModeFrameID = window.requestAnimationFrame(animate);
            };
            animate();
        }
        let support;
        function calcSupport() {
            const window = ssr_window_esm_getWindow();
            const document = ssr_window_esm_getDocument();
            return {
                smoothScroll: document.documentElement && "scrollBehavior" in document.documentElement.style,
                touch: !!("ontouchstart" in window || window.DocumentTouch && document instanceof window.DocumentTouch),
                passiveListener: function checkPassiveListener() {
                    let supportsPassive = false;
                    try {
                        const opts = Object.defineProperty({}, "passive", {
                            get() {
                                supportsPassive = true;
                            }
                        });
                        window.addEventListener("testPassiveListener", null, opts);
                    } catch (e) {}
                    return supportsPassive;
                }(),
                gestures: function checkGestures() {
                    return "ongesturestart" in window;
                }()
            };
        }
        function getSupport() {
            if (!support) support = calcSupport();
            return support;
        }
        let deviceCached;
        function calcDevice({userAgent} = {}) {
            const support = getSupport();
            const window = ssr_window_esm_getWindow();
            const platform = window.navigator.platform;
            const ua = userAgent || window.navigator.userAgent;
            const device = {
                ios: false,
                android: false
            };
            const screenWidth = window.screen.width;
            const screenHeight = window.screen.height;
            const android = ua.match(/(Android);?[\s\/]+([\d.]+)?/);
            let ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
            const ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
            const iphone = !ipad && ua.match(/(iPhone\sOS|iOS)\s([\d_]+)/);
            const windows = "Win32" === platform;
            let macos = "MacIntel" === platform;
            const iPadScreens = [ "1024x1366", "1366x1024", "834x1194", "1194x834", "834x1112", "1112x834", "768x1024", "1024x768", "820x1180", "1180x820", "810x1080", "1080x810" ];
            if (!ipad && macos && support.touch && iPadScreens.indexOf(`${screenWidth}x${screenHeight}`) >= 0) {
                ipad = ua.match(/(Version)\/([\d.]+)/);
                if (!ipad) ipad = [ 0, 1, "13_0_0" ];
                macos = false;
            }
            if (android && !windows) {
                device.os = "android";
                device.android = true;
            }
            if (ipad || iphone || ipod) {
                device.os = "ios";
                device.ios = true;
            }
            return device;
        }
        function getDevice(overrides = {}) {
            if (!deviceCached) deviceCached = calcDevice(overrides);
            return deviceCached;
        }
        let browser;
        function calcBrowser() {
            const window = ssr_window_esm_getWindow();
            function isSafari() {
                const ua = window.navigator.userAgent.toLowerCase();
                return ua.indexOf("safari") >= 0 && ua.indexOf("chrome") < 0 && ua.indexOf("android") < 0;
            }
            return {
                isSafari: isSafari(),
                isWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(window.navigator.userAgent)
            };
        }
        function getBrowser() {
            if (!browser) browser = calcBrowser();
            return browser;
        }
        function Resize({swiper, on, emit}) {
            const window = ssr_window_esm_getWindow();
            let observer = null;
            let animationFrame = null;
            const resizeHandler = () => {
                if (!swiper || swiper.destroyed || !swiper.initialized) return;
                emit("beforeResize");
                emit("resize");
            };
            const createObserver = () => {
                if (!swiper || swiper.destroyed || !swiper.initialized) return;
                observer = new ResizeObserver((entries => {
                    animationFrame = window.requestAnimationFrame((() => {
                        const {width, height} = swiper;
                        let newWidth = width;
                        let newHeight = height;
                        entries.forEach((({contentBoxSize, contentRect, target}) => {
                            if (target && target !== swiper.el) return;
                            newWidth = contentRect ? contentRect.width : (contentBoxSize[0] || contentBoxSize).inlineSize;
                            newHeight = contentRect ? contentRect.height : (contentBoxSize[0] || contentBoxSize).blockSize;
                        }));
                        if (newWidth !== width || newHeight !== height) resizeHandler();
                    }));
                }));
                observer.observe(swiper.el);
            };
            const removeObserver = () => {
                if (animationFrame) window.cancelAnimationFrame(animationFrame);
                if (observer && observer.unobserve && swiper.el) {
                    observer.unobserve(swiper.el);
                    observer = null;
                }
            };
            const orientationChangeHandler = () => {
                if (!swiper || swiper.destroyed || !swiper.initialized) return;
                emit("orientationchange");
            };
            on("init", (() => {
                if (swiper.params.resizeObserver && "undefined" !== typeof window.ResizeObserver) {
                    createObserver();
                    return;
                }
                window.addEventListener("resize", resizeHandler);
                window.addEventListener("orientationchange", orientationChangeHandler);
            }));
            on("destroy", (() => {
                removeObserver();
                window.removeEventListener("resize", resizeHandler);
                window.removeEventListener("orientationchange", orientationChangeHandler);
            }));
        }
        function Observer({swiper, extendParams, on, emit}) {
            const observers = [];
            const window = ssr_window_esm_getWindow();
            const attach = (target, options = {}) => {
                const ObserverFunc = window.MutationObserver || window.WebkitMutationObserver;
                const observer = new ObserverFunc((mutations => {
                    if (1 === mutations.length) {
                        emit("observerUpdate", mutations[0]);
                        return;
                    }
                    const observerUpdate = function observerUpdate() {
                        emit("observerUpdate", mutations[0]);
                    };
                    if (window.requestAnimationFrame) window.requestAnimationFrame(observerUpdate); else window.setTimeout(observerUpdate, 0);
                }));
                observer.observe(target, {
                    attributes: "undefined" === typeof options.attributes ? true : options.attributes,
                    childList: "undefined" === typeof options.childList ? true : options.childList,
                    characterData: "undefined" === typeof options.characterData ? true : options.characterData
                });
                observers.push(observer);
            };
            const init = () => {
                if (!swiper.params.observer) return;
                if (swiper.params.observeParents) {
                    const containerParents = swiper.$el.parents();
                    for (let i = 0; i < containerParents.length; i += 1) attach(containerParents[i]);
                }
                attach(swiper.$el[0], {
                    childList: swiper.params.observeSlideChildren
                });
                attach(swiper.$wrapperEl[0], {
                    attributes: false
                });
            };
            const destroy = () => {
                observers.forEach((observer => {
                    observer.disconnect();
                }));
                observers.splice(0, observers.length);
            };
            extendParams({
                observer: false,
                observeParents: false,
                observeSlideChildren: false
            });
            on("init", init);
            on("destroy", destroy);
        }
        const events_emitter = {
            on(events, handler, priority) {
                const self = this;
                if (!self.eventsListeners || self.destroyed) return self;
                if ("function" !== typeof handler) return self;
                const method = priority ? "unshift" : "push";
                events.split(" ").forEach((event => {
                    if (!self.eventsListeners[event]) self.eventsListeners[event] = [];
                    self.eventsListeners[event][method](handler);
                }));
                return self;
            },
            once(events, handler, priority) {
                const self = this;
                if (!self.eventsListeners || self.destroyed) return self;
                if ("function" !== typeof handler) return self;
                function onceHandler(...args) {
                    self.off(events, onceHandler);
                    if (onceHandler.__emitterProxy) delete onceHandler.__emitterProxy;
                    handler.apply(self, args);
                }
                onceHandler.__emitterProxy = handler;
                return self.on(events, onceHandler, priority);
            },
            onAny(handler, priority) {
                const self = this;
                if (!self.eventsListeners || self.destroyed) return self;
                if ("function" !== typeof handler) return self;
                const method = priority ? "unshift" : "push";
                if (self.eventsAnyListeners.indexOf(handler) < 0) self.eventsAnyListeners[method](handler);
                return self;
            },
            offAny(handler) {
                const self = this;
                if (!self.eventsListeners || self.destroyed) return self;
                if (!self.eventsAnyListeners) return self;
                const index = self.eventsAnyListeners.indexOf(handler);
                if (index >= 0) self.eventsAnyListeners.splice(index, 1);
                return self;
            },
            off(events, handler) {
                const self = this;
                if (!self.eventsListeners || self.destroyed) return self;
                if (!self.eventsListeners) return self;
                events.split(" ").forEach((event => {
                    if ("undefined" === typeof handler) self.eventsListeners[event] = []; else if (self.eventsListeners[event]) self.eventsListeners[event].forEach(((eventHandler, index) => {
                        if (eventHandler === handler || eventHandler.__emitterProxy && eventHandler.__emitterProxy === handler) self.eventsListeners[event].splice(index, 1);
                    }));
                }));
                return self;
            },
            emit(...args) {
                const self = this;
                if (!self.eventsListeners || self.destroyed) return self;
                if (!self.eventsListeners) return self;
                let events;
                let data;
                let context;
                if ("string" === typeof args[0] || Array.isArray(args[0])) {
                    events = args[0];
                    data = args.slice(1, args.length);
                    context = self;
                } else {
                    events = args[0].events;
                    data = args[0].data;
                    context = args[0].context || self;
                }
                data.unshift(context);
                const eventsArray = Array.isArray(events) ? events : events.split(" ");
                eventsArray.forEach((event => {
                    if (self.eventsAnyListeners && self.eventsAnyListeners.length) self.eventsAnyListeners.forEach((eventHandler => {
                        eventHandler.apply(context, [ event, ...data ]);
                    }));
                    if (self.eventsListeners && self.eventsListeners[event]) self.eventsListeners[event].forEach((eventHandler => {
                        eventHandler.apply(context, data);
                    }));
                }));
                return self;
            }
        };
        function updateSize() {
            const swiper = this;
            let width;
            let height;
            const $el = swiper.$el;
            if ("undefined" !== typeof swiper.params.width && null !== swiper.params.width) width = swiper.params.width; else width = $el[0].clientWidth;
            if ("undefined" !== typeof swiper.params.height && null !== swiper.params.height) height = swiper.params.height; else height = $el[0].clientHeight;
            if (0 === width && swiper.isHorizontal() || 0 === height && swiper.isVertical()) return;
            width = width - parseInt($el.css("padding-left") || 0, 10) - parseInt($el.css("padding-right") || 0, 10);
            height = height - parseInt($el.css("padding-top") || 0, 10) - parseInt($el.css("padding-bottom") || 0, 10);
            if (Number.isNaN(width)) width = 0;
            if (Number.isNaN(height)) height = 0;
            Object.assign(swiper, {
                width,
                height,
                size: swiper.isHorizontal() ? width : height
            });
        }
        function updateSlides() {
            const swiper = this;
            function getDirectionLabel(property) {
                if (swiper.isHorizontal()) return property;
                return {
                    width: "height",
                    "margin-top": "margin-left",
                    "margin-bottom ": "margin-right",
                    "margin-left": "margin-top",
                    "margin-right": "margin-bottom",
                    "padding-left": "padding-top",
                    "padding-right": "padding-bottom",
                    marginRight: "marginBottom"
                }[property];
            }
            function getDirectionPropertyValue(node, label) {
                return parseFloat(node.getPropertyValue(getDirectionLabel(label)) || 0);
            }
            const params = swiper.params;
            const {$wrapperEl, size: swiperSize, rtlTranslate: rtl, wrongRTL} = swiper;
            const isVirtual = swiper.virtual && params.virtual.enabled;
            const previousSlidesLength = isVirtual ? swiper.virtual.slides.length : swiper.slides.length;
            const slides = $wrapperEl.children(`.${swiper.params.slideClass}`);
            const slidesLength = isVirtual ? swiper.virtual.slides.length : slides.length;
            let snapGrid = [];
            const slidesGrid = [];
            const slidesSizesGrid = [];
            let offsetBefore = params.slidesOffsetBefore;
            if ("function" === typeof offsetBefore) offsetBefore = params.slidesOffsetBefore.call(swiper);
            let offsetAfter = params.slidesOffsetAfter;
            if ("function" === typeof offsetAfter) offsetAfter = params.slidesOffsetAfter.call(swiper);
            const previousSnapGridLength = swiper.snapGrid.length;
            const previousSlidesGridLength = swiper.slidesGrid.length;
            let spaceBetween = params.spaceBetween;
            let slidePosition = -offsetBefore;
            let prevSlideSize = 0;
            let index = 0;
            if ("undefined" === typeof swiperSize) return;
            if ("string" === typeof spaceBetween && spaceBetween.indexOf("%") >= 0) spaceBetween = parseFloat(spaceBetween.replace("%", "")) / 100 * swiperSize;
            swiper.virtualSize = -spaceBetween;
            if (rtl) slides.css({
                marginLeft: "",
                marginBottom: "",
                marginTop: ""
            }); else slides.css({
                marginRight: "",
                marginBottom: "",
                marginTop: ""
            });
            if (params.centeredSlides && params.cssMode) {
                utils_setCSSProperty(swiper.wrapperEl, "--swiper-centered-offset-before", "");
                utils_setCSSProperty(swiper.wrapperEl, "--swiper-centered-offset-after", "");
            }
            const gridEnabled = params.grid && params.grid.rows > 1 && swiper.grid;
            if (gridEnabled) swiper.grid.initSlides(slidesLength);
            let slideSize;
            const shouldResetSlideSize = "auto" === params.slidesPerView && params.breakpoints && Object.keys(params.breakpoints).filter((key => "undefined" !== typeof params.breakpoints[key].slidesPerView)).length > 0;
            for (let i = 0; i < slidesLength; i += 1) {
                slideSize = 0;
                const slide = slides.eq(i);
                if (gridEnabled) swiper.grid.updateSlide(i, slide, slidesLength, getDirectionLabel);
                if ("none" === slide.css("display")) continue;
                if ("auto" === params.slidesPerView) {
                    if (shouldResetSlideSize) slides[i].style[getDirectionLabel("width")] = ``;
                    const slideStyles = getComputedStyle(slide[0]);
                    const currentTransform = slide[0].style.transform;
                    const currentWebKitTransform = slide[0].style.webkitTransform;
                    if (currentTransform) slide[0].style.transform = "none";
                    if (currentWebKitTransform) slide[0].style.webkitTransform = "none";
                    if (params.roundLengths) slideSize = swiper.isHorizontal() ? slide.outerWidth(true) : slide.outerHeight(true); else {
                        const width = getDirectionPropertyValue(slideStyles, "width");
                        const paddingLeft = getDirectionPropertyValue(slideStyles, "padding-left");
                        const paddingRight = getDirectionPropertyValue(slideStyles, "padding-right");
                        const marginLeft = getDirectionPropertyValue(slideStyles, "margin-left");
                        const marginRight = getDirectionPropertyValue(slideStyles, "margin-right");
                        const boxSizing = slideStyles.getPropertyValue("box-sizing");
                        if (boxSizing && "border-box" === boxSizing) slideSize = width + marginLeft + marginRight; else {
                            const {clientWidth, offsetWidth} = slide[0];
                            slideSize = width + paddingLeft + paddingRight + marginLeft + marginRight + (offsetWidth - clientWidth);
                        }
                    }
                    if (currentTransform) slide[0].style.transform = currentTransform;
                    if (currentWebKitTransform) slide[0].style.webkitTransform = currentWebKitTransform;
                    if (params.roundLengths) slideSize = Math.floor(slideSize);
                } else {
                    slideSize = (swiperSize - (params.slidesPerView - 1) * spaceBetween) / params.slidesPerView;
                    if (params.roundLengths) slideSize = Math.floor(slideSize);
                    if (slides[i]) slides[i].style[getDirectionLabel("width")] = `${slideSize}px`;
                }
                if (slides[i]) slides[i].swiperSlideSize = slideSize;
                slidesSizesGrid.push(slideSize);
                if (params.centeredSlides) {
                    slidePosition = slidePosition + slideSize / 2 + prevSlideSize / 2 + spaceBetween;
                    if (0 === prevSlideSize && 0 !== i) slidePosition = slidePosition - swiperSize / 2 - spaceBetween;
                    if (0 === i) slidePosition = slidePosition - swiperSize / 2 - spaceBetween;
                    if (Math.abs(slidePosition) < 1 / 1e3) slidePosition = 0;
                    if (params.roundLengths) slidePosition = Math.floor(slidePosition);
                    if (index % params.slidesPerGroup === 0) snapGrid.push(slidePosition);
                    slidesGrid.push(slidePosition);
                } else {
                    if (params.roundLengths) slidePosition = Math.floor(slidePosition);
                    if ((index - Math.min(swiper.params.slidesPerGroupSkip, index)) % swiper.params.slidesPerGroup === 0) snapGrid.push(slidePosition);
                    slidesGrid.push(slidePosition);
                    slidePosition = slidePosition + slideSize + spaceBetween;
                }
                swiper.virtualSize += slideSize + spaceBetween;
                prevSlideSize = slideSize;
                index += 1;
            }
            swiper.virtualSize = Math.max(swiper.virtualSize, swiperSize) + offsetAfter;
            if (rtl && wrongRTL && ("slide" === params.effect || "coverflow" === params.effect)) $wrapperEl.css({
                width: `${swiper.virtualSize + params.spaceBetween}px`
            });
            if (params.setWrapperSize) $wrapperEl.css({
                [getDirectionLabel("width")]: `${swiper.virtualSize + params.spaceBetween}px`
            });
            if (gridEnabled) swiper.grid.updateWrapperSize(slideSize, snapGrid, getDirectionLabel);
            if (!params.centeredSlides) {
                const newSlidesGrid = [];
                for (let i = 0; i < snapGrid.length; i += 1) {
                    let slidesGridItem = snapGrid[i];
                    if (params.roundLengths) slidesGridItem = Math.floor(slidesGridItem);
                    if (snapGrid[i] <= swiper.virtualSize - swiperSize) newSlidesGrid.push(slidesGridItem);
                }
                snapGrid = newSlidesGrid;
                if (Math.floor(swiper.virtualSize - swiperSize) - Math.floor(snapGrid[snapGrid.length - 1]) > 1) snapGrid.push(swiper.virtualSize - swiperSize);
            }
            if (0 === snapGrid.length) snapGrid = [ 0 ];
            if (0 !== params.spaceBetween) {
                const key = swiper.isHorizontal() && rtl ? "marginLeft" : getDirectionLabel("marginRight");
                slides.filter(((_, slideIndex) => {
                    if (!params.cssMode) return true;
                    if (slideIndex === slides.length - 1) return false;
                    return true;
                })).css({
                    [key]: `${spaceBetween}px`
                });
            }
            if (params.centeredSlides && params.centeredSlidesBounds) {
                let allSlidesSize = 0;
                slidesSizesGrid.forEach((slideSizeValue => {
                    allSlidesSize += slideSizeValue + (params.spaceBetween ? params.spaceBetween : 0);
                }));
                allSlidesSize -= params.spaceBetween;
                const maxSnap = allSlidesSize - swiperSize;
                snapGrid = snapGrid.map((snap => {
                    if (snap < 0) return -offsetBefore;
                    if (snap > maxSnap) return maxSnap + offsetAfter;
                    return snap;
                }));
            }
            if (params.centerInsufficientSlides) {
                let allSlidesSize = 0;
                slidesSizesGrid.forEach((slideSizeValue => {
                    allSlidesSize += slideSizeValue + (params.spaceBetween ? params.spaceBetween : 0);
                }));
                allSlidesSize -= params.spaceBetween;
                if (allSlidesSize < swiperSize) {
                    const allSlidesOffset = (swiperSize - allSlidesSize) / 2;
                    snapGrid.forEach(((snap, snapIndex) => {
                        snapGrid[snapIndex] = snap - allSlidesOffset;
                    }));
                    slidesGrid.forEach(((snap, snapIndex) => {
                        slidesGrid[snapIndex] = snap + allSlidesOffset;
                    }));
                }
            }
            Object.assign(swiper, {
                slides,
                snapGrid,
                slidesGrid,
                slidesSizesGrid
            });
            if (params.centeredSlides && params.cssMode && !params.centeredSlidesBounds) {
                utils_setCSSProperty(swiper.wrapperEl, "--swiper-centered-offset-before", `${-snapGrid[0]}px`);
                utils_setCSSProperty(swiper.wrapperEl, "--swiper-centered-offset-after", `${swiper.size / 2 - slidesSizesGrid[slidesSizesGrid.length - 1] / 2}px`);
                const addToSnapGrid = -swiper.snapGrid[0];
                const addToSlidesGrid = -swiper.slidesGrid[0];
                swiper.snapGrid = swiper.snapGrid.map((v => v + addToSnapGrid));
                swiper.slidesGrid = swiper.slidesGrid.map((v => v + addToSlidesGrid));
            }
            if (slidesLength !== previousSlidesLength) swiper.emit("slidesLengthChange");
            if (snapGrid.length !== previousSnapGridLength) {
                if (swiper.params.watchOverflow) swiper.checkOverflow();
                swiper.emit("snapGridLengthChange");
            }
            if (slidesGrid.length !== previousSlidesGridLength) swiper.emit("slidesGridLengthChange");
            if (params.watchSlidesProgress) swiper.updateSlidesOffset();
            if (!isVirtual && !params.cssMode && ("slide" === params.effect || "fade" === params.effect)) {
                const backFaceHiddenClass = `${params.containerModifierClass}backface-hidden`;
                const hasClassBackfaceClassAdded = swiper.$el.hasClass(backFaceHiddenClass);
                if (slidesLength <= params.maxBackfaceHiddenSlides) {
                    if (!hasClassBackfaceClassAdded) swiper.$el.addClass(backFaceHiddenClass);
                } else if (hasClassBackfaceClassAdded) swiper.$el.removeClass(backFaceHiddenClass);
            }
        }
        function updateAutoHeight(speed) {
            const swiper = this;
            const activeSlides = [];
            const isVirtual = swiper.virtual && swiper.params.virtual.enabled;
            let newHeight = 0;
            let i;
            if ("number" === typeof speed) swiper.setTransition(speed); else if (true === speed) swiper.setTransition(swiper.params.speed);
            const getSlideByIndex = index => {
                if (isVirtual) return swiper.slides.filter((el => parseInt(el.getAttribute("data-swiper-slide-index"), 10) === index))[0];
                return swiper.slides.eq(index)[0];
            };
            if ("auto" !== swiper.params.slidesPerView && swiper.params.slidesPerView > 1) if (swiper.params.centeredSlides) (swiper.visibleSlides || dom([])).each((slide => {
                activeSlides.push(slide);
            })); else for (i = 0; i < Math.ceil(swiper.params.slidesPerView); i += 1) {
                const index = swiper.activeIndex + i;
                if (index > swiper.slides.length && !isVirtual) break;
                activeSlides.push(getSlideByIndex(index));
            } else activeSlides.push(getSlideByIndex(swiper.activeIndex));
            for (i = 0; i < activeSlides.length; i += 1) if ("undefined" !== typeof activeSlides[i]) {
                const height = activeSlides[i].offsetHeight;
                newHeight = height > newHeight ? height : newHeight;
            }
            if (newHeight || 0 === newHeight) swiper.$wrapperEl.css("height", `${newHeight}px`);
        }
        function updateSlidesOffset() {
            const swiper = this;
            const slides = swiper.slides;
            for (let i = 0; i < slides.length; i += 1) slides[i].swiperSlideOffset = swiper.isHorizontal() ? slides[i].offsetLeft : slides[i].offsetTop;
        }
        function updateSlidesProgress(translate = this && this.translate || 0) {
            const swiper = this;
            const params = swiper.params;
            const {slides, rtlTranslate: rtl, snapGrid} = swiper;
            if (0 === slides.length) return;
            if ("undefined" === typeof slides[0].swiperSlideOffset) swiper.updateSlidesOffset();
            let offsetCenter = -translate;
            if (rtl) offsetCenter = translate;
            slides.removeClass(params.slideVisibleClass);
            swiper.visibleSlidesIndexes = [];
            swiper.visibleSlides = [];
            for (let i = 0; i < slides.length; i += 1) {
                const slide = slides[i];
                let slideOffset = slide.swiperSlideOffset;
                if (params.cssMode && params.centeredSlides) slideOffset -= slides[0].swiperSlideOffset;
                const slideProgress = (offsetCenter + (params.centeredSlides ? swiper.minTranslate() : 0) - slideOffset) / (slide.swiperSlideSize + params.spaceBetween);
                const originalSlideProgress = (offsetCenter - snapGrid[0] + (params.centeredSlides ? swiper.minTranslate() : 0) - slideOffset) / (slide.swiperSlideSize + params.spaceBetween);
                const slideBefore = -(offsetCenter - slideOffset);
                const slideAfter = slideBefore + swiper.slidesSizesGrid[i];
                const isVisible = slideBefore >= 0 && slideBefore < swiper.size - 1 || slideAfter > 1 && slideAfter <= swiper.size || slideBefore <= 0 && slideAfter >= swiper.size;
                if (isVisible) {
                    swiper.visibleSlides.push(slide);
                    swiper.visibleSlidesIndexes.push(i);
                    slides.eq(i).addClass(params.slideVisibleClass);
                }
                slide.progress = rtl ? -slideProgress : slideProgress;
                slide.originalProgress = rtl ? -originalSlideProgress : originalSlideProgress;
            }
            swiper.visibleSlides = dom(swiper.visibleSlides);
        }
        function updateProgress(translate) {
            const swiper = this;
            if ("undefined" === typeof translate) {
                const multiplier = swiper.rtlTranslate ? -1 : 1;
                translate = swiper && swiper.translate && swiper.translate * multiplier || 0;
            }
            const params = swiper.params;
            const translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
            let {progress, isBeginning, isEnd} = swiper;
            const wasBeginning = isBeginning;
            const wasEnd = isEnd;
            if (0 === translatesDiff) {
                progress = 0;
                isBeginning = true;
                isEnd = true;
            } else {
                progress = (translate - swiper.minTranslate()) / translatesDiff;
                isBeginning = progress <= 0;
                isEnd = progress >= 1;
            }
            Object.assign(swiper, {
                progress,
                isBeginning,
                isEnd
            });
            if (params.watchSlidesProgress || params.centeredSlides && params.autoHeight) swiper.updateSlidesProgress(translate);
            if (isBeginning && !wasBeginning) swiper.emit("reachBeginning toEdge");
            if (isEnd && !wasEnd) swiper.emit("reachEnd toEdge");
            if (wasBeginning && !isBeginning || wasEnd && !isEnd) swiper.emit("fromEdge");
            swiper.emit("progress", progress);
        }
        function updateSlidesClasses() {
            const swiper = this;
            const {slides, params, $wrapperEl, activeIndex, realIndex} = swiper;
            const isVirtual = swiper.virtual && params.virtual.enabled;
            slides.removeClass(`${params.slideActiveClass} ${params.slideNextClass} ${params.slidePrevClass} ${params.slideDuplicateActiveClass} ${params.slideDuplicateNextClass} ${params.slideDuplicatePrevClass}`);
            let activeSlide;
            if (isVirtual) activeSlide = swiper.$wrapperEl.find(`.${params.slideClass}[data-swiper-slide-index="${activeIndex}"]`); else activeSlide = slides.eq(activeIndex);
            activeSlide.addClass(params.slideActiveClass);
            if (params.loop) if (activeSlide.hasClass(params.slideDuplicateClass)) $wrapperEl.children(`.${params.slideClass}:not(.${params.slideDuplicateClass})[data-swiper-slide-index="${realIndex}"]`).addClass(params.slideDuplicateActiveClass); else $wrapperEl.children(`.${params.slideClass}.${params.slideDuplicateClass}[data-swiper-slide-index="${realIndex}"]`).addClass(params.slideDuplicateActiveClass);
            let nextSlide = activeSlide.nextAll(`.${params.slideClass}`).eq(0).addClass(params.slideNextClass);
            if (params.loop && 0 === nextSlide.length) {
                nextSlide = slides.eq(0);
                nextSlide.addClass(params.slideNextClass);
            }
            let prevSlide = activeSlide.prevAll(`.${params.slideClass}`).eq(0).addClass(params.slidePrevClass);
            if (params.loop && 0 === prevSlide.length) {
                prevSlide = slides.eq(-1);
                prevSlide.addClass(params.slidePrevClass);
            }
            if (params.loop) {
                if (nextSlide.hasClass(params.slideDuplicateClass)) $wrapperEl.children(`.${params.slideClass}:not(.${params.slideDuplicateClass})[data-swiper-slide-index="${nextSlide.attr("data-swiper-slide-index")}"]`).addClass(params.slideDuplicateNextClass); else $wrapperEl.children(`.${params.slideClass}.${params.slideDuplicateClass}[data-swiper-slide-index="${nextSlide.attr("data-swiper-slide-index")}"]`).addClass(params.slideDuplicateNextClass);
                if (prevSlide.hasClass(params.slideDuplicateClass)) $wrapperEl.children(`.${params.slideClass}:not(.${params.slideDuplicateClass})[data-swiper-slide-index="${prevSlide.attr("data-swiper-slide-index")}"]`).addClass(params.slideDuplicatePrevClass); else $wrapperEl.children(`.${params.slideClass}.${params.slideDuplicateClass}[data-swiper-slide-index="${prevSlide.attr("data-swiper-slide-index")}"]`).addClass(params.slideDuplicatePrevClass);
            }
            swiper.emitSlidesClasses();
        }
        function updateActiveIndex(newActiveIndex) {
            const swiper = this;
            const translate = swiper.rtlTranslate ? swiper.translate : -swiper.translate;
            const {slidesGrid, snapGrid, params, activeIndex: previousIndex, realIndex: previousRealIndex, snapIndex: previousSnapIndex} = swiper;
            let activeIndex = newActiveIndex;
            let snapIndex;
            if ("undefined" === typeof activeIndex) {
                for (let i = 0; i < slidesGrid.length; i += 1) if ("undefined" !== typeof slidesGrid[i + 1]) {
                    if (translate >= slidesGrid[i] && translate < slidesGrid[i + 1] - (slidesGrid[i + 1] - slidesGrid[i]) / 2) activeIndex = i; else if (translate >= slidesGrid[i] && translate < slidesGrid[i + 1]) activeIndex = i + 1;
                } else if (translate >= slidesGrid[i]) activeIndex = i;
                if (params.normalizeSlideIndex) if (activeIndex < 0 || "undefined" === typeof activeIndex) activeIndex = 0;
            }
            if (snapGrid.indexOf(translate) >= 0) snapIndex = snapGrid.indexOf(translate); else {
                const skip = Math.min(params.slidesPerGroupSkip, activeIndex);
                snapIndex = skip + Math.floor((activeIndex - skip) / params.slidesPerGroup);
            }
            if (snapIndex >= snapGrid.length) snapIndex = snapGrid.length - 1;
            if (activeIndex === previousIndex) {
                if (snapIndex !== previousSnapIndex) {
                    swiper.snapIndex = snapIndex;
                    swiper.emit("snapIndexChange");
                }
                return;
            }
            const realIndex = parseInt(swiper.slides.eq(activeIndex).attr("data-swiper-slide-index") || activeIndex, 10);
            Object.assign(swiper, {
                snapIndex,
                realIndex,
                previousIndex,
                activeIndex
            });
            swiper.emit("activeIndexChange");
            swiper.emit("snapIndexChange");
            if (previousRealIndex !== realIndex) swiper.emit("realIndexChange");
            if (swiper.initialized || swiper.params.runCallbacksOnInit) swiper.emit("slideChange");
        }
        function updateClickedSlide(e) {
            const swiper = this;
            const params = swiper.params;
            const slide = dom(e).closest(`.${params.slideClass}`)[0];
            let slideFound = false;
            let slideIndex;
            if (slide) for (let i = 0; i < swiper.slides.length; i += 1) if (swiper.slides[i] === slide) {
                slideFound = true;
                slideIndex = i;
                break;
            }
            if (slide && slideFound) {
                swiper.clickedSlide = slide;
                if (swiper.virtual && swiper.params.virtual.enabled) swiper.clickedIndex = parseInt(dom(slide).attr("data-swiper-slide-index"), 10); else swiper.clickedIndex = slideIndex;
            } else {
                swiper.clickedSlide = void 0;
                swiper.clickedIndex = void 0;
                return;
            }
            if (params.slideToClickedSlide && void 0 !== swiper.clickedIndex && swiper.clickedIndex !== swiper.activeIndex) swiper.slideToClickedSlide();
        }
        const update = {
            updateSize,
            updateSlides,
            updateAutoHeight,
            updateSlidesOffset,
            updateSlidesProgress,
            updateProgress,
            updateSlidesClasses,
            updateActiveIndex,
            updateClickedSlide
        };
        function getSwiperTranslate(axis = (this.isHorizontal() ? "x" : "y")) {
            const swiper = this;
            const {params, rtlTranslate: rtl, translate, $wrapperEl} = swiper;
            if (params.virtualTranslate) return rtl ? -translate : translate;
            if (params.cssMode) return translate;
            let currentTranslate = utils_getTranslate($wrapperEl[0], axis);
            if (rtl) currentTranslate = -currentTranslate;
            return currentTranslate || 0;
        }
        function setTranslate(translate, byController) {
            const swiper = this;
            const {rtlTranslate: rtl, params, $wrapperEl, wrapperEl, progress} = swiper;
            let x = 0;
            let y = 0;
            const z = 0;
            if (swiper.isHorizontal()) x = rtl ? -translate : translate; else y = translate;
            if (params.roundLengths) {
                x = Math.floor(x);
                y = Math.floor(y);
            }
            if (params.cssMode) wrapperEl[swiper.isHorizontal() ? "scrollLeft" : "scrollTop"] = swiper.isHorizontal() ? -x : -y; else if (!params.virtualTranslate) $wrapperEl.transform(`translate3d(${x}px, ${y}px, ${z}px)`);
            swiper.previousTranslate = swiper.translate;
            swiper.translate = swiper.isHorizontal() ? x : y;
            let newProgress;
            const translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
            if (0 === translatesDiff) newProgress = 0; else newProgress = (translate - swiper.minTranslate()) / translatesDiff;
            if (newProgress !== progress) swiper.updateProgress(translate);
            swiper.emit("setTranslate", swiper.translate, byController);
        }
        function minTranslate() {
            return -this.snapGrid[0];
        }
        function maxTranslate() {
            return -this.snapGrid[this.snapGrid.length - 1];
        }
        function translateTo(translate = 0, speed = this.params.speed, runCallbacks = true, translateBounds = true, internal) {
            const swiper = this;
            const {params, wrapperEl} = swiper;
            if (swiper.animating && params.preventInteractionOnTransition) return false;
            const minTranslate = swiper.minTranslate();
            const maxTranslate = swiper.maxTranslate();
            let newTranslate;
            if (translateBounds && translate > minTranslate) newTranslate = minTranslate; else if (translateBounds && translate < maxTranslate) newTranslate = maxTranslate; else newTranslate = translate;
            swiper.updateProgress(newTranslate);
            if (params.cssMode) {
                const isH = swiper.isHorizontal();
                if (0 === speed) wrapperEl[isH ? "scrollLeft" : "scrollTop"] = -newTranslate; else {
                    if (!swiper.support.smoothScroll) {
                        animateCSSModeScroll({
                            swiper,
                            targetPosition: -newTranslate,
                            side: isH ? "left" : "top"
                        });
                        return true;
                    }
                    wrapperEl.scrollTo({
                        [isH ? "left" : "top"]: -newTranslate,
                        behavior: "smooth"
                    });
                }
                return true;
            }
            if (0 === speed) {
                swiper.setTransition(0);
                swiper.setTranslate(newTranslate);
                if (runCallbacks) {
                    swiper.emit("beforeTransitionStart", speed, internal);
                    swiper.emit("transitionEnd");
                }
            } else {
                swiper.setTransition(speed);
                swiper.setTranslate(newTranslate);
                if (runCallbacks) {
                    swiper.emit("beforeTransitionStart", speed, internal);
                    swiper.emit("transitionStart");
                }
                if (!swiper.animating) {
                    swiper.animating = true;
                    if (!swiper.onTranslateToWrapperTransitionEnd) swiper.onTranslateToWrapperTransitionEnd = function transitionEnd(e) {
                        if (!swiper || swiper.destroyed) return;
                        if (e.target !== this) return;
                        swiper.$wrapperEl[0].removeEventListener("transitionend", swiper.onTranslateToWrapperTransitionEnd);
                        swiper.$wrapperEl[0].removeEventListener("webkitTransitionEnd", swiper.onTranslateToWrapperTransitionEnd);
                        swiper.onTranslateToWrapperTransitionEnd = null;
                        delete swiper.onTranslateToWrapperTransitionEnd;
                        if (runCallbacks) swiper.emit("transitionEnd");
                    };
                    swiper.$wrapperEl[0].addEventListener("transitionend", swiper.onTranslateToWrapperTransitionEnd);
                    swiper.$wrapperEl[0].addEventListener("webkitTransitionEnd", swiper.onTranslateToWrapperTransitionEnd);
                }
            }
            return true;
        }
        const translate = {
            getTranslate: getSwiperTranslate,
            setTranslate,
            minTranslate,
            maxTranslate,
            translateTo
        };
        function setTransition(duration, byController) {
            const swiper = this;
            if (!swiper.params.cssMode) swiper.$wrapperEl.transition(duration);
            swiper.emit("setTransition", duration, byController);
        }
        function transitionEmit({swiper, runCallbacks, direction, step}) {
            const {activeIndex, previousIndex} = swiper;
            let dir = direction;
            if (!dir) if (activeIndex > previousIndex) dir = "next"; else if (activeIndex < previousIndex) dir = "prev"; else dir = "reset";
            swiper.emit(`transition${step}`);
            if (runCallbacks && activeIndex !== previousIndex) {
                if ("reset" === dir) {
                    swiper.emit(`slideResetTransition${step}`);
                    return;
                }
                swiper.emit(`slideChangeTransition${step}`);
                if ("next" === dir) swiper.emit(`slideNextTransition${step}`); else swiper.emit(`slidePrevTransition${step}`);
            }
        }
        function transitionStart(runCallbacks = true, direction) {
            const swiper = this;
            const {params} = swiper;
            if (params.cssMode) return;
            if (params.autoHeight) swiper.updateAutoHeight();
            transitionEmit({
                swiper,
                runCallbacks,
                direction,
                step: "Start"
            });
        }
        function transitionEnd_transitionEnd(runCallbacks = true, direction) {
            const swiper = this;
            const {params} = swiper;
            swiper.animating = false;
            if (params.cssMode) return;
            swiper.setTransition(0);
            transitionEmit({
                swiper,
                runCallbacks,
                direction,
                step: "End"
            });
        }
        const core_transition = {
            setTransition,
            transitionStart,
            transitionEnd: transitionEnd_transitionEnd
        };
        function slideTo(index = 0, speed = this.params.speed, runCallbacks = true, internal, initial) {
            if ("number" !== typeof index && "string" !== typeof index) throw new Error(`The 'index' argument cannot have type other than 'number' or 'string'. [${typeof index}] given.`);
            if ("string" === typeof index) {
                const indexAsNumber = parseInt(index, 10);
                const isValidNumber = isFinite(indexAsNumber);
                if (!isValidNumber) throw new Error(`The passed-in 'index' (string) couldn't be converted to 'number'. [${index}] given.`);
                index = indexAsNumber;
            }
            const swiper = this;
            let slideIndex = index;
            if (slideIndex < 0) slideIndex = 0;
            const {params, snapGrid, slidesGrid, previousIndex, activeIndex, rtlTranslate: rtl, wrapperEl, enabled} = swiper;
            if (swiper.animating && params.preventInteractionOnTransition || !enabled && !internal && !initial) return false;
            const skip = Math.min(swiper.params.slidesPerGroupSkip, slideIndex);
            let snapIndex = skip + Math.floor((slideIndex - skip) / swiper.params.slidesPerGroup);
            if (snapIndex >= snapGrid.length) snapIndex = snapGrid.length - 1;
            const translate = -snapGrid[snapIndex];
            if (params.normalizeSlideIndex) for (let i = 0; i < slidesGrid.length; i += 1) {
                const normalizedTranslate = -Math.floor(100 * translate);
                const normalizedGrid = Math.floor(100 * slidesGrid[i]);
                const normalizedGridNext = Math.floor(100 * slidesGrid[i + 1]);
                if ("undefined" !== typeof slidesGrid[i + 1]) {
                    if (normalizedTranslate >= normalizedGrid && normalizedTranslate < normalizedGridNext - (normalizedGridNext - normalizedGrid) / 2) slideIndex = i; else if (normalizedTranslate >= normalizedGrid && normalizedTranslate < normalizedGridNext) slideIndex = i + 1;
                } else if (normalizedTranslate >= normalizedGrid) slideIndex = i;
            }
            if (swiper.initialized && slideIndex !== activeIndex) {
                if (!swiper.allowSlideNext && translate < swiper.translate && translate < swiper.minTranslate()) return false;
                if (!swiper.allowSlidePrev && translate > swiper.translate && translate > swiper.maxTranslate()) if ((activeIndex || 0) !== slideIndex) return false;
            }
            if (slideIndex !== (previousIndex || 0) && runCallbacks) swiper.emit("beforeSlideChangeStart");
            swiper.updateProgress(translate);
            let direction;
            if (slideIndex > activeIndex) direction = "next"; else if (slideIndex < activeIndex) direction = "prev"; else direction = "reset";
            if (rtl && -translate === swiper.translate || !rtl && translate === swiper.translate) {
                swiper.updateActiveIndex(slideIndex);
                if (params.autoHeight) swiper.updateAutoHeight();
                swiper.updateSlidesClasses();
                if ("slide" !== params.effect) swiper.setTranslate(translate);
                if ("reset" !== direction) {
                    swiper.transitionStart(runCallbacks, direction);
                    swiper.transitionEnd(runCallbacks, direction);
                }
                return false;
            }
            if (params.cssMode) {
                const isH = swiper.isHorizontal();
                const t = rtl ? translate : -translate;
                if (0 === speed) {
                    const isVirtual = swiper.virtual && swiper.params.virtual.enabled;
                    if (isVirtual) {
                        swiper.wrapperEl.style.scrollSnapType = "none";
                        swiper._immediateVirtual = true;
                    }
                    wrapperEl[isH ? "scrollLeft" : "scrollTop"] = t;
                    if (isVirtual) requestAnimationFrame((() => {
                        swiper.wrapperEl.style.scrollSnapType = "";
                        swiper._swiperImmediateVirtual = false;
                    }));
                } else {
                    if (!swiper.support.smoothScroll) {
                        animateCSSModeScroll({
                            swiper,
                            targetPosition: t,
                            side: isH ? "left" : "top"
                        });
                        return true;
                    }
                    wrapperEl.scrollTo({
                        [isH ? "left" : "top"]: t,
                        behavior: "smooth"
                    });
                }
                return true;
            }
            swiper.setTransition(speed);
            swiper.setTranslate(translate);
            swiper.updateActiveIndex(slideIndex);
            swiper.updateSlidesClasses();
            swiper.emit("beforeTransitionStart", speed, internal);
            swiper.transitionStart(runCallbacks, direction);
            if (0 === speed) swiper.transitionEnd(runCallbacks, direction); else if (!swiper.animating) {
                swiper.animating = true;
                if (!swiper.onSlideToWrapperTransitionEnd) swiper.onSlideToWrapperTransitionEnd = function transitionEnd(e) {
                    if (!swiper || swiper.destroyed) return;
                    if (e.target !== this) return;
                    swiper.$wrapperEl[0].removeEventListener("transitionend", swiper.onSlideToWrapperTransitionEnd);
                    swiper.$wrapperEl[0].removeEventListener("webkitTransitionEnd", swiper.onSlideToWrapperTransitionEnd);
                    swiper.onSlideToWrapperTransitionEnd = null;
                    delete swiper.onSlideToWrapperTransitionEnd;
                    swiper.transitionEnd(runCallbacks, direction);
                };
                swiper.$wrapperEl[0].addEventListener("transitionend", swiper.onSlideToWrapperTransitionEnd);
                swiper.$wrapperEl[0].addEventListener("webkitTransitionEnd", swiper.onSlideToWrapperTransitionEnd);
            }
            return true;
        }
        function slideToLoop(index = 0, speed = this.params.speed, runCallbacks = true, internal) {
            if ("string" === typeof index) {
                const indexAsNumber = parseInt(index, 10);
                const isValidNumber = isFinite(indexAsNumber);
                if (!isValidNumber) throw new Error(`The passed-in 'index' (string) couldn't be converted to 'number'. [${index}] given.`);
                index = indexAsNumber;
            }
            const swiper = this;
            let newIndex = index;
            if (swiper.params.loop) newIndex += swiper.loopedSlides;
            return swiper.slideTo(newIndex, speed, runCallbacks, internal);
        }
        function slideNext(speed = this.params.speed, runCallbacks = true, internal) {
            const swiper = this;
            const {animating, enabled, params} = swiper;
            if (!enabled) return swiper;
            let perGroup = params.slidesPerGroup;
            if ("auto" === params.slidesPerView && 1 === params.slidesPerGroup && params.slidesPerGroupAuto) perGroup = Math.max(swiper.slidesPerViewDynamic("current", true), 1);
            const increment = swiper.activeIndex < params.slidesPerGroupSkip ? 1 : perGroup;
            if (params.loop) {
                if (animating && params.loopPreventsSlide) return false;
                swiper.loopFix();
                swiper._clientLeft = swiper.$wrapperEl[0].clientLeft;
            }
            if (params.rewind && swiper.isEnd) return swiper.slideTo(0, speed, runCallbacks, internal);
            return swiper.slideTo(swiper.activeIndex + increment, speed, runCallbacks, internal);
        }
        function slidePrev(speed = this.params.speed, runCallbacks = true, internal) {
            const swiper = this;
            const {params, animating, snapGrid, slidesGrid, rtlTranslate, enabled} = swiper;
            if (!enabled) return swiper;
            if (params.loop) {
                if (animating && params.loopPreventsSlide) return false;
                swiper.loopFix();
                swiper._clientLeft = swiper.$wrapperEl[0].clientLeft;
            }
            const translate = rtlTranslate ? swiper.translate : -swiper.translate;
            function normalize(val) {
                if (val < 0) return -Math.floor(Math.abs(val));
                return Math.floor(val);
            }
            const normalizedTranslate = normalize(translate);
            const normalizedSnapGrid = snapGrid.map((val => normalize(val)));
            let prevSnap = snapGrid[normalizedSnapGrid.indexOf(normalizedTranslate) - 1];
            if ("undefined" === typeof prevSnap && params.cssMode) {
                let prevSnapIndex;
                snapGrid.forEach(((snap, snapIndex) => {
                    if (normalizedTranslate >= snap) prevSnapIndex = snapIndex;
                }));
                if ("undefined" !== typeof prevSnapIndex) prevSnap = snapGrid[prevSnapIndex > 0 ? prevSnapIndex - 1 : prevSnapIndex];
            }
            let prevIndex = 0;
            if ("undefined" !== typeof prevSnap) {
                prevIndex = slidesGrid.indexOf(prevSnap);
                if (prevIndex < 0) prevIndex = swiper.activeIndex - 1;
                if ("auto" === params.slidesPerView && 1 === params.slidesPerGroup && params.slidesPerGroupAuto) {
                    prevIndex = prevIndex - swiper.slidesPerViewDynamic("previous", true) + 1;
                    prevIndex = Math.max(prevIndex, 0);
                }
            }
            if (params.rewind && swiper.isBeginning) {
                const lastIndex = swiper.params.virtual && swiper.params.virtual.enabled && swiper.virtual ? swiper.virtual.slides.length - 1 : swiper.slides.length - 1;
                return swiper.slideTo(lastIndex, speed, runCallbacks, internal);
            }
            return swiper.slideTo(prevIndex, speed, runCallbacks, internal);
        }
        function slideReset(speed = this.params.speed, runCallbacks = true, internal) {
            const swiper = this;
            return swiper.slideTo(swiper.activeIndex, speed, runCallbacks, internal);
        }
        function slideToClosest(speed = this.params.speed, runCallbacks = true, internal, threshold = .5) {
            const swiper = this;
            let index = swiper.activeIndex;
            const skip = Math.min(swiper.params.slidesPerGroupSkip, index);
            const snapIndex = skip + Math.floor((index - skip) / swiper.params.slidesPerGroup);
            const translate = swiper.rtlTranslate ? swiper.translate : -swiper.translate;
            if (translate >= swiper.snapGrid[snapIndex]) {
                const currentSnap = swiper.snapGrid[snapIndex];
                const nextSnap = swiper.snapGrid[snapIndex + 1];
                if (translate - currentSnap > (nextSnap - currentSnap) * threshold) index += swiper.params.slidesPerGroup;
            } else {
                const prevSnap = swiper.snapGrid[snapIndex - 1];
                const currentSnap = swiper.snapGrid[snapIndex];
                if (translate - prevSnap <= (currentSnap - prevSnap) * threshold) index -= swiper.params.slidesPerGroup;
            }
            index = Math.max(index, 0);
            index = Math.min(index, swiper.slidesGrid.length - 1);
            return swiper.slideTo(index, speed, runCallbacks, internal);
        }
        function slideToClickedSlide() {
            const swiper = this;
            const {params, $wrapperEl} = swiper;
            const slidesPerView = "auto" === params.slidesPerView ? swiper.slidesPerViewDynamic() : params.slidesPerView;
            let slideToIndex = swiper.clickedIndex;
            let realIndex;
            if (params.loop) {
                if (swiper.animating) return;
                realIndex = parseInt(dom(swiper.clickedSlide).attr("data-swiper-slide-index"), 10);
                if (params.centeredSlides) if (slideToIndex < swiper.loopedSlides - slidesPerView / 2 || slideToIndex > swiper.slides.length - swiper.loopedSlides + slidesPerView / 2) {
                    swiper.loopFix();
                    slideToIndex = $wrapperEl.children(`.${params.slideClass}[data-swiper-slide-index="${realIndex}"]:not(.${params.slideDuplicateClass})`).eq(0).index();
                    utils_nextTick((() => {
                        swiper.slideTo(slideToIndex);
                    }));
                } else swiper.slideTo(slideToIndex); else if (slideToIndex > swiper.slides.length - slidesPerView) {
                    swiper.loopFix();
                    slideToIndex = $wrapperEl.children(`.${params.slideClass}[data-swiper-slide-index="${realIndex}"]:not(.${params.slideDuplicateClass})`).eq(0).index();
                    utils_nextTick((() => {
                        swiper.slideTo(slideToIndex);
                    }));
                } else swiper.slideTo(slideToIndex);
            } else swiper.slideTo(slideToIndex);
        }
        const slide = {
            slideTo,
            slideToLoop,
            slideNext,
            slidePrev,
            slideReset,
            slideToClosest,
            slideToClickedSlide
        };
        function loopCreate() {
            const swiper = this;
            const document = ssr_window_esm_getDocument();
            const {params, $wrapperEl} = swiper;
            const $selector = $wrapperEl.children().length > 0 ? dom($wrapperEl.children()[0].parentNode) : $wrapperEl;
            $selector.children(`.${params.slideClass}.${params.slideDuplicateClass}`).remove();
            let slides = $selector.children(`.${params.slideClass}`);
            if (params.loopFillGroupWithBlank) {
                const blankSlidesNum = params.slidesPerGroup - slides.length % params.slidesPerGroup;
                if (blankSlidesNum !== params.slidesPerGroup) {
                    for (let i = 0; i < blankSlidesNum; i += 1) {
                        const blankNode = dom(document.createElement("div")).addClass(`${params.slideClass} ${params.slideBlankClass}`);
                        $selector.append(blankNode);
                    }
                    slides = $selector.children(`.${params.slideClass}`);
                }
            }
            if ("auto" === params.slidesPerView && !params.loopedSlides) params.loopedSlides = slides.length;
            swiper.loopedSlides = Math.ceil(parseFloat(params.loopedSlides || params.slidesPerView, 10));
            swiper.loopedSlides += params.loopAdditionalSlides;
            if (swiper.loopedSlides > slides.length && swiper.params.loopedSlidesLimit) swiper.loopedSlides = slides.length;
            const prependSlides = [];
            const appendSlides = [];
            slides.each(((el, index) => {
                const slide = dom(el);
                slide.attr("data-swiper-slide-index", index);
            }));
            for (let i = 0; i < swiper.loopedSlides; i += 1) {
                const index = i - Math.floor(i / slides.length) * slides.length;
                appendSlides.push(slides.eq(index)[0]);
                prependSlides.unshift(slides.eq(slides.length - index - 1)[0]);
            }
            for (let i = 0; i < appendSlides.length; i += 1) $selector.append(dom(appendSlides[i].cloneNode(true)).addClass(params.slideDuplicateClass));
            for (let i = prependSlides.length - 1; i >= 0; i -= 1) $selector.prepend(dom(prependSlides[i].cloneNode(true)).addClass(params.slideDuplicateClass));
        }
        function loopFix() {
            const swiper = this;
            swiper.emit("beforeLoopFix");
            const {activeIndex, slides, loopedSlides, allowSlidePrev, allowSlideNext, snapGrid, rtlTranslate: rtl} = swiper;
            let newIndex;
            swiper.allowSlidePrev = true;
            swiper.allowSlideNext = true;
            const snapTranslate = -snapGrid[activeIndex];
            const diff = snapTranslate - swiper.getTranslate();
            if (activeIndex < loopedSlides) {
                newIndex = slides.length - 3 * loopedSlides + activeIndex;
                newIndex += loopedSlides;
                const slideChanged = swiper.slideTo(newIndex, 0, false, true);
                if (slideChanged && 0 !== diff) swiper.setTranslate((rtl ? -swiper.translate : swiper.translate) - diff);
            } else if (activeIndex >= slides.length - loopedSlides) {
                newIndex = -slides.length + activeIndex + loopedSlides;
                newIndex += loopedSlides;
                const slideChanged = swiper.slideTo(newIndex, 0, false, true);
                if (slideChanged && 0 !== diff) swiper.setTranslate((rtl ? -swiper.translate : swiper.translate) - diff);
            }
            swiper.allowSlidePrev = allowSlidePrev;
            swiper.allowSlideNext = allowSlideNext;
            swiper.emit("loopFix");
        }
        function loopDestroy() {
            const swiper = this;
            const {$wrapperEl, params, slides} = swiper;
            $wrapperEl.children(`.${params.slideClass}.${params.slideDuplicateClass},.${params.slideClass}.${params.slideBlankClass}`).remove();
            slides.removeAttr("data-swiper-slide-index");
        }
        const loop = {
            loopCreate,
            loopFix,
            loopDestroy
        };
        function setGrabCursor(moving) {
            const swiper = this;
            if (swiper.support.touch || !swiper.params.simulateTouch || swiper.params.watchOverflow && swiper.isLocked || swiper.params.cssMode) return;
            const el = "container" === swiper.params.touchEventsTarget ? swiper.el : swiper.wrapperEl;
            el.style.cursor = "move";
            el.style.cursor = moving ? "grabbing" : "grab";
        }
        function unsetGrabCursor() {
            const swiper = this;
            if (swiper.support.touch || swiper.params.watchOverflow && swiper.isLocked || swiper.params.cssMode) return;
            swiper["container" === swiper.params.touchEventsTarget ? "el" : "wrapperEl"].style.cursor = "";
        }
        const grab_cursor = {
            setGrabCursor,
            unsetGrabCursor
        };
        function closestElement(selector, base = this) {
            function __closestFrom(el) {
                if (!el || el === ssr_window_esm_getDocument() || el === ssr_window_esm_getWindow()) return null;
                if (el.assignedSlot) el = el.assignedSlot;
                const found = el.closest(selector);
                if (!found && !el.getRootNode) return null;
                return found || __closestFrom(el.getRootNode().host);
            }
            return __closestFrom(base);
        }
        function onTouchStart(event) {
            const swiper = this;
            const document = ssr_window_esm_getDocument();
            const window = ssr_window_esm_getWindow();
            const data = swiper.touchEventsData;
            const {params, touches, enabled} = swiper;
            if (!enabled) return;
            if (swiper.animating && params.preventInteractionOnTransition) return;
            if (!swiper.animating && params.cssMode && params.loop) swiper.loopFix();
            let e = event;
            if (e.originalEvent) e = e.originalEvent;
            let $targetEl = dom(e.target);
            if ("wrapper" === params.touchEventsTarget) if (!$targetEl.closest(swiper.wrapperEl).length) return;
            data.isTouchEvent = "touchstart" === e.type;
            if (!data.isTouchEvent && "which" in e && 3 === e.which) return;
            if (!data.isTouchEvent && "button" in e && e.button > 0) return;
            if (data.isTouched && data.isMoved) return;
            const swipingClassHasValue = !!params.noSwipingClass && "" !== params.noSwipingClass;
            const eventPath = event.composedPath ? event.composedPath() : event.path;
            if (swipingClassHasValue && e.target && e.target.shadowRoot && eventPath) $targetEl = dom(eventPath[0]);
            const noSwipingSelector = params.noSwipingSelector ? params.noSwipingSelector : `.${params.noSwipingClass}`;
            const isTargetShadow = !!(e.target && e.target.shadowRoot);
            if (params.noSwiping && (isTargetShadow ? closestElement(noSwipingSelector, $targetEl[0]) : $targetEl.closest(noSwipingSelector)[0])) {
                swiper.allowClick = true;
                return;
            }
            if (params.swipeHandler) if (!$targetEl.closest(params.swipeHandler)[0]) return;
            touches.currentX = "touchstart" === e.type ? e.targetTouches[0].pageX : e.pageX;
            touches.currentY = "touchstart" === e.type ? e.targetTouches[0].pageY : e.pageY;
            const startX = touches.currentX;
            const startY = touches.currentY;
            const edgeSwipeDetection = params.edgeSwipeDetection || params.iOSEdgeSwipeDetection;
            const edgeSwipeThreshold = params.edgeSwipeThreshold || params.iOSEdgeSwipeThreshold;
            if (edgeSwipeDetection && (startX <= edgeSwipeThreshold || startX >= window.innerWidth - edgeSwipeThreshold)) if ("prevent" === edgeSwipeDetection) event.preventDefault(); else return;
            Object.assign(data, {
                isTouched: true,
                isMoved: false,
                allowTouchCallbacks: true,
                isScrolling: void 0,
                startMoving: void 0
            });
            touches.startX = startX;
            touches.startY = startY;
            data.touchStartTime = utils_now();
            swiper.allowClick = true;
            swiper.updateSize();
            swiper.swipeDirection = void 0;
            if (params.threshold > 0) data.allowThresholdMove = false;
            if ("touchstart" !== e.type) {
                let preventDefault = true;
                if ($targetEl.is(data.focusableElements)) {
                    preventDefault = false;
                    if ("SELECT" === $targetEl[0].nodeName) data.isTouched = false;
                }
                if (document.activeElement && dom(document.activeElement).is(data.focusableElements) && document.activeElement !== $targetEl[0]) document.activeElement.blur();
                const shouldPreventDefault = preventDefault && swiper.allowTouchMove && params.touchStartPreventDefault;
                if ((params.touchStartForcePreventDefault || shouldPreventDefault) && !$targetEl[0].isContentEditable) e.preventDefault();
            }
            if (swiper.params.freeMode && swiper.params.freeMode.enabled && swiper.freeMode && swiper.animating && !params.cssMode) swiper.freeMode.onTouchStart();
            swiper.emit("touchStart", e);
        }
        function onTouchMove(event) {
            const document = ssr_window_esm_getDocument();
            const swiper = this;
            const data = swiper.touchEventsData;
            const {params, touches, rtlTranslate: rtl, enabled} = swiper;
            if (!enabled) return;
            let e = event;
            if (e.originalEvent) e = e.originalEvent;
            if (!data.isTouched) {
                if (data.startMoving && data.isScrolling) swiper.emit("touchMoveOpposite", e);
                return;
            }
            if (data.isTouchEvent && "touchmove" !== e.type) return;
            const targetTouch = "touchmove" === e.type && e.targetTouches && (e.targetTouches[0] || e.changedTouches[0]);
            const pageX = "touchmove" === e.type ? targetTouch.pageX : e.pageX;
            const pageY = "touchmove" === e.type ? targetTouch.pageY : e.pageY;
            if (e.preventedByNestedSwiper) {
                touches.startX = pageX;
                touches.startY = pageY;
                return;
            }
            if (!swiper.allowTouchMove) {
                if (!dom(e.target).is(data.focusableElements)) swiper.allowClick = false;
                if (data.isTouched) {
                    Object.assign(touches, {
                        startX: pageX,
                        startY: pageY,
                        currentX: pageX,
                        currentY: pageY
                    });
                    data.touchStartTime = utils_now();
                }
                return;
            }
            if (data.isTouchEvent && params.touchReleaseOnEdges && !params.loop) if (swiper.isVertical()) {
                if (pageY < touches.startY && swiper.translate <= swiper.maxTranslate() || pageY > touches.startY && swiper.translate >= swiper.minTranslate()) {
                    data.isTouched = false;
                    data.isMoved = false;
                    return;
                }
            } else if (pageX < touches.startX && swiper.translate <= swiper.maxTranslate() || pageX > touches.startX && swiper.translate >= swiper.minTranslate()) return;
            if (data.isTouchEvent && document.activeElement) if (e.target === document.activeElement && dom(e.target).is(data.focusableElements)) {
                data.isMoved = true;
                swiper.allowClick = false;
                return;
            }
            if (data.allowTouchCallbacks) swiper.emit("touchMove", e);
            if (e.targetTouches && e.targetTouches.length > 1) return;
            touches.currentX = pageX;
            touches.currentY = pageY;
            const diffX = touches.currentX - touches.startX;
            const diffY = touches.currentY - touches.startY;
            if (swiper.params.threshold && Math.sqrt(diffX ** 2 + diffY ** 2) < swiper.params.threshold) return;
            if ("undefined" === typeof data.isScrolling) {
                let touchAngle;
                if (swiper.isHorizontal() && touches.currentY === touches.startY || swiper.isVertical() && touches.currentX === touches.startX) data.isScrolling = false; else if (diffX * diffX + diffY * diffY >= 25) {
                    touchAngle = 180 * Math.atan2(Math.abs(diffY), Math.abs(diffX)) / Math.PI;
                    data.isScrolling = swiper.isHorizontal() ? touchAngle > params.touchAngle : 90 - touchAngle > params.touchAngle;
                }
            }
            if (data.isScrolling) swiper.emit("touchMoveOpposite", e);
            if ("undefined" === typeof data.startMoving) if (touches.currentX !== touches.startX || touches.currentY !== touches.startY) data.startMoving = true;
            if (data.isScrolling) {
                data.isTouched = false;
                return;
            }
            if (!data.startMoving) return;
            swiper.allowClick = false;
            if (!params.cssMode && e.cancelable) e.preventDefault();
            if (params.touchMoveStopPropagation && !params.nested) e.stopPropagation();
            if (!data.isMoved) {
                if (params.loop && !params.cssMode) swiper.loopFix();
                data.startTranslate = swiper.getTranslate();
                swiper.setTransition(0);
                if (swiper.animating) swiper.$wrapperEl.trigger("webkitTransitionEnd transitionend");
                data.allowMomentumBounce = false;
                if (params.grabCursor && (true === swiper.allowSlideNext || true === swiper.allowSlidePrev)) swiper.setGrabCursor(true);
                swiper.emit("sliderFirstMove", e);
            }
            swiper.emit("sliderMove", e);
            data.isMoved = true;
            let diff = swiper.isHorizontal() ? diffX : diffY;
            touches.diff = diff;
            diff *= params.touchRatio;
            if (rtl) diff = -diff;
            swiper.swipeDirection = diff > 0 ? "prev" : "next";
            data.currentTranslate = diff + data.startTranslate;
            let disableParentSwiper = true;
            let resistanceRatio = params.resistanceRatio;
            if (params.touchReleaseOnEdges) resistanceRatio = 0;
            if (diff > 0 && data.currentTranslate > swiper.minTranslate()) {
                disableParentSwiper = false;
                if (params.resistance) data.currentTranslate = swiper.minTranslate() - 1 + (-swiper.minTranslate() + data.startTranslate + diff) ** resistanceRatio;
            } else if (diff < 0 && data.currentTranslate < swiper.maxTranslate()) {
                disableParentSwiper = false;
                if (params.resistance) data.currentTranslate = swiper.maxTranslate() + 1 - (swiper.maxTranslate() - data.startTranslate - diff) ** resistanceRatio;
            }
            if (disableParentSwiper) e.preventedByNestedSwiper = true;
            if (!swiper.allowSlideNext && "next" === swiper.swipeDirection && data.currentTranslate < data.startTranslate) data.currentTranslate = data.startTranslate;
            if (!swiper.allowSlidePrev && "prev" === swiper.swipeDirection && data.currentTranslate > data.startTranslate) data.currentTranslate = data.startTranslate;
            if (!swiper.allowSlidePrev && !swiper.allowSlideNext) data.currentTranslate = data.startTranslate;
            if (params.threshold > 0) if (Math.abs(diff) > params.threshold || data.allowThresholdMove) {
                if (!data.allowThresholdMove) {
                    data.allowThresholdMove = true;
                    touches.startX = touches.currentX;
                    touches.startY = touches.currentY;
                    data.currentTranslate = data.startTranslate;
                    touches.diff = swiper.isHorizontal() ? touches.currentX - touches.startX : touches.currentY - touches.startY;
                    return;
                }
            } else {
                data.currentTranslate = data.startTranslate;
                return;
            }
            if (!params.followFinger || params.cssMode) return;
            if (params.freeMode && params.freeMode.enabled && swiper.freeMode || params.watchSlidesProgress) {
                swiper.updateActiveIndex();
                swiper.updateSlidesClasses();
            }
            if (swiper.params.freeMode && params.freeMode.enabled && swiper.freeMode) swiper.freeMode.onTouchMove();
            swiper.updateProgress(data.currentTranslate);
            swiper.setTranslate(data.currentTranslate);
        }
        function onTouchEnd(event) {
            const swiper = this;
            const data = swiper.touchEventsData;
            const {params, touches, rtlTranslate: rtl, slidesGrid, enabled} = swiper;
            if (!enabled) return;
            let e = event;
            if (e.originalEvent) e = e.originalEvent;
            if (data.allowTouchCallbacks) swiper.emit("touchEnd", e);
            data.allowTouchCallbacks = false;
            if (!data.isTouched) {
                if (data.isMoved && params.grabCursor) swiper.setGrabCursor(false);
                data.isMoved = false;
                data.startMoving = false;
                return;
            }
            if (params.grabCursor && data.isMoved && data.isTouched && (true === swiper.allowSlideNext || true === swiper.allowSlidePrev)) swiper.setGrabCursor(false);
            const touchEndTime = utils_now();
            const timeDiff = touchEndTime - data.touchStartTime;
            if (swiper.allowClick) {
                const pathTree = e.path || e.composedPath && e.composedPath();
                swiper.updateClickedSlide(pathTree && pathTree[0] || e.target);
                swiper.emit("tap click", e);
                if (timeDiff < 300 && touchEndTime - data.lastClickTime < 300) swiper.emit("doubleTap doubleClick", e);
            }
            data.lastClickTime = utils_now();
            utils_nextTick((() => {
                if (!swiper.destroyed) swiper.allowClick = true;
            }));
            if (!data.isTouched || !data.isMoved || !swiper.swipeDirection || 0 === touches.diff || data.currentTranslate === data.startTranslate) {
                data.isTouched = false;
                data.isMoved = false;
                data.startMoving = false;
                return;
            }
            data.isTouched = false;
            data.isMoved = false;
            data.startMoving = false;
            let currentPos;
            if (params.followFinger) currentPos = rtl ? swiper.translate : -swiper.translate; else currentPos = -data.currentTranslate;
            if (params.cssMode) return;
            if (swiper.params.freeMode && params.freeMode.enabled) {
                swiper.freeMode.onTouchEnd({
                    currentPos
                });
                return;
            }
            let stopIndex = 0;
            let groupSize = swiper.slidesSizesGrid[0];
            for (let i = 0; i < slidesGrid.length; i += i < params.slidesPerGroupSkip ? 1 : params.slidesPerGroup) {
                const increment = i < params.slidesPerGroupSkip - 1 ? 1 : params.slidesPerGroup;
                if ("undefined" !== typeof slidesGrid[i + increment]) {
                    if (currentPos >= slidesGrid[i] && currentPos < slidesGrid[i + increment]) {
                        stopIndex = i;
                        groupSize = slidesGrid[i + increment] - slidesGrid[i];
                    }
                } else if (currentPos >= slidesGrid[i]) {
                    stopIndex = i;
                    groupSize = slidesGrid[slidesGrid.length - 1] - slidesGrid[slidesGrid.length - 2];
                }
            }
            let rewindFirstIndex = null;
            let rewindLastIndex = null;
            if (params.rewind) if (swiper.isBeginning) rewindLastIndex = swiper.params.virtual && swiper.params.virtual.enabled && swiper.virtual ? swiper.virtual.slides.length - 1 : swiper.slides.length - 1; else if (swiper.isEnd) rewindFirstIndex = 0;
            const ratio = (currentPos - slidesGrid[stopIndex]) / groupSize;
            const increment = stopIndex < params.slidesPerGroupSkip - 1 ? 1 : params.slidesPerGroup;
            if (timeDiff > params.longSwipesMs) {
                if (!params.longSwipes) {
                    swiper.slideTo(swiper.activeIndex);
                    return;
                }
                if ("next" === swiper.swipeDirection) if (ratio >= params.longSwipesRatio) swiper.slideTo(params.rewind && swiper.isEnd ? rewindFirstIndex : stopIndex + increment); else swiper.slideTo(stopIndex);
                if ("prev" === swiper.swipeDirection) if (ratio > 1 - params.longSwipesRatio) swiper.slideTo(stopIndex + increment); else if (null !== rewindLastIndex && ratio < 0 && Math.abs(ratio) > params.longSwipesRatio) swiper.slideTo(rewindLastIndex); else swiper.slideTo(stopIndex);
            } else {
                if (!params.shortSwipes) {
                    swiper.slideTo(swiper.activeIndex);
                    return;
                }
                const isNavButtonTarget = swiper.navigation && (e.target === swiper.navigation.nextEl || e.target === swiper.navigation.prevEl);
                if (!isNavButtonTarget) {
                    if ("next" === swiper.swipeDirection) swiper.slideTo(null !== rewindFirstIndex ? rewindFirstIndex : stopIndex + increment);
                    if ("prev" === swiper.swipeDirection) swiper.slideTo(null !== rewindLastIndex ? rewindLastIndex : stopIndex);
                } else if (e.target === swiper.navigation.nextEl) swiper.slideTo(stopIndex + increment); else swiper.slideTo(stopIndex);
            }
        }
        function onResize() {
            const swiper = this;
            const {params, el} = swiper;
            if (el && 0 === el.offsetWidth) return;
            if (params.breakpoints) swiper.setBreakpoint();
            const {allowSlideNext, allowSlidePrev, snapGrid} = swiper;
            swiper.allowSlideNext = true;
            swiper.allowSlidePrev = true;
            swiper.updateSize();
            swiper.updateSlides();
            swiper.updateSlidesClasses();
            if (("auto" === params.slidesPerView || params.slidesPerView > 1) && swiper.isEnd && !swiper.isBeginning && !swiper.params.centeredSlides) swiper.slideTo(swiper.slides.length - 1, 0, false, true); else swiper.slideTo(swiper.activeIndex, 0, false, true);
            if (swiper.autoplay && swiper.autoplay.running && swiper.autoplay.paused) swiper.autoplay.run();
            swiper.allowSlidePrev = allowSlidePrev;
            swiper.allowSlideNext = allowSlideNext;
            if (swiper.params.watchOverflow && snapGrid !== swiper.snapGrid) swiper.checkOverflow();
        }
        function onClick(e) {
            const swiper = this;
            if (!swiper.enabled) return;
            if (!swiper.allowClick) {
                if (swiper.params.preventClicks) e.preventDefault();
                if (swiper.params.preventClicksPropagation && swiper.animating) {
                    e.stopPropagation();
                    e.stopImmediatePropagation();
                }
            }
        }
        function onScroll() {
            const swiper = this;
            const {wrapperEl, rtlTranslate, enabled} = swiper;
            if (!enabled) return;
            swiper.previousTranslate = swiper.translate;
            if (swiper.isHorizontal()) swiper.translate = -wrapperEl.scrollLeft; else swiper.translate = -wrapperEl.scrollTop;
            if (0 === swiper.translate) swiper.translate = 0;
            swiper.updateActiveIndex();
            swiper.updateSlidesClasses();
            let newProgress;
            const translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
            if (0 === translatesDiff) newProgress = 0; else newProgress = (swiper.translate - swiper.minTranslate()) / translatesDiff;
            if (newProgress !== swiper.progress) swiper.updateProgress(rtlTranslate ? -swiper.translate : swiper.translate);
            swiper.emit("setTranslate", swiper.translate, false);
        }
        let dummyEventAttached = false;
        function dummyEventListener() {}
        const events = (swiper, method) => {
            const document = ssr_window_esm_getDocument();
            const {params, touchEvents, el, wrapperEl, device, support} = swiper;
            const capture = !!params.nested;
            const domMethod = "on" === method ? "addEventListener" : "removeEventListener";
            const swiperMethod = method;
            if (!support.touch) {
                el[domMethod](touchEvents.start, swiper.onTouchStart, false);
                document[domMethod](touchEvents.move, swiper.onTouchMove, capture);
                document[domMethod](touchEvents.end, swiper.onTouchEnd, false);
            } else {
                const passiveListener = "touchstart" === touchEvents.start && support.passiveListener && params.passiveListeners ? {
                    passive: true,
                    capture: false
                } : false;
                el[domMethod](touchEvents.start, swiper.onTouchStart, passiveListener);
                el[domMethod](touchEvents.move, swiper.onTouchMove, support.passiveListener ? {
                    passive: false,
                    capture
                } : capture);
                el[domMethod](touchEvents.end, swiper.onTouchEnd, passiveListener);
                if (touchEvents.cancel) el[domMethod](touchEvents.cancel, swiper.onTouchEnd, passiveListener);
            }
            if (params.preventClicks || params.preventClicksPropagation) el[domMethod]("click", swiper.onClick, true);
            if (params.cssMode) wrapperEl[domMethod]("scroll", swiper.onScroll);
            if (params.updateOnWindowResize) swiper[swiperMethod](device.ios || device.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", onResize, true); else swiper[swiperMethod]("observerUpdate", onResize, true);
        };
        function attachEvents() {
            const swiper = this;
            const document = ssr_window_esm_getDocument();
            const {params, support} = swiper;
            swiper.onTouchStart = onTouchStart.bind(swiper);
            swiper.onTouchMove = onTouchMove.bind(swiper);
            swiper.onTouchEnd = onTouchEnd.bind(swiper);
            if (params.cssMode) swiper.onScroll = onScroll.bind(swiper);
            swiper.onClick = onClick.bind(swiper);
            if (support.touch && !dummyEventAttached) {
                document.addEventListener("touchstart", dummyEventListener);
                dummyEventAttached = true;
            }
            events(swiper, "on");
        }
        function detachEvents() {
            const swiper = this;
            events(swiper, "off");
        }
        const core_events = {
            attachEvents,
            detachEvents
        };
        const isGridEnabled = (swiper, params) => swiper.grid && params.grid && params.grid.rows > 1;
        function setBreakpoint() {
            const swiper = this;
            const {activeIndex, initialized, loopedSlides = 0, params, $el} = swiper;
            const breakpoints = params.breakpoints;
            if (!breakpoints || breakpoints && 0 === Object.keys(breakpoints).length) return;
            const breakpoint = swiper.getBreakpoint(breakpoints, swiper.params.breakpointsBase, swiper.el);
            if (!breakpoint || swiper.currentBreakpoint === breakpoint) return;
            const breakpointOnlyParams = breakpoint in breakpoints ? breakpoints[breakpoint] : void 0;
            const breakpointParams = breakpointOnlyParams || swiper.originalParams;
            const wasMultiRow = isGridEnabled(swiper, params);
            const isMultiRow = isGridEnabled(swiper, breakpointParams);
            const wasEnabled = params.enabled;
            if (wasMultiRow && !isMultiRow) {
                $el.removeClass(`${params.containerModifierClass}grid ${params.containerModifierClass}grid-column`);
                swiper.emitContainerClasses();
            } else if (!wasMultiRow && isMultiRow) {
                $el.addClass(`${params.containerModifierClass}grid`);
                if (breakpointParams.grid.fill && "column" === breakpointParams.grid.fill || !breakpointParams.grid.fill && "column" === params.grid.fill) $el.addClass(`${params.containerModifierClass}grid-column`);
                swiper.emitContainerClasses();
            }
            [ "navigation", "pagination", "scrollbar" ].forEach((prop => {
                const wasModuleEnabled = params[prop] && params[prop].enabled;
                const isModuleEnabled = breakpointParams[prop] && breakpointParams[prop].enabled;
                if (wasModuleEnabled && !isModuleEnabled) swiper[prop].disable();
                if (!wasModuleEnabled && isModuleEnabled) swiper[prop].enable();
            }));
            const directionChanged = breakpointParams.direction && breakpointParams.direction !== params.direction;
            const needsReLoop = params.loop && (breakpointParams.slidesPerView !== params.slidesPerView || directionChanged);
            if (directionChanged && initialized) swiper.changeDirection();
            utils_extend(swiper.params, breakpointParams);
            const isEnabled = swiper.params.enabled;
            Object.assign(swiper, {
                allowTouchMove: swiper.params.allowTouchMove,
                allowSlideNext: swiper.params.allowSlideNext,
                allowSlidePrev: swiper.params.allowSlidePrev
            });
            if (wasEnabled && !isEnabled) swiper.disable(); else if (!wasEnabled && isEnabled) swiper.enable();
            swiper.currentBreakpoint = breakpoint;
            swiper.emit("_beforeBreakpoint", breakpointParams);
            if (needsReLoop && initialized) {
                swiper.loopDestroy();
                swiper.loopCreate();
                swiper.updateSlides();
                swiper.slideTo(activeIndex - loopedSlides + swiper.loopedSlides, 0, false);
            }
            swiper.emit("breakpoint", breakpointParams);
        }
        function getBreakpoint(breakpoints, base = "window", containerEl) {
            if (!breakpoints || "container" === base && !containerEl) return;
            let breakpoint = false;
            const window = ssr_window_esm_getWindow();
            const currentHeight = "window" === base ? window.innerHeight : containerEl.clientHeight;
            const points = Object.keys(breakpoints).map((point => {
                if ("string" === typeof point && 0 === point.indexOf("@")) {
                    const minRatio = parseFloat(point.substr(1));
                    const value = currentHeight * minRatio;
                    return {
                        value,
                        point
                    };
                }
                return {
                    value: point,
                    point
                };
            }));
            points.sort(((a, b) => parseInt(a.value, 10) - parseInt(b.value, 10)));
            for (let i = 0; i < points.length; i += 1) {
                const {point, value} = points[i];
                if ("window" === base) {
                    if (window.matchMedia(`(min-width: ${value}px)`).matches) breakpoint = point;
                } else if (value <= containerEl.clientWidth) breakpoint = point;
            }
            return breakpoint || "max";
        }
        const breakpoints = {
            setBreakpoint,
            getBreakpoint
        };
        function prepareClasses(entries, prefix) {
            const resultClasses = [];
            entries.forEach((item => {
                if ("object" === typeof item) Object.keys(item).forEach((classNames => {
                    if (item[classNames]) resultClasses.push(prefix + classNames);
                })); else if ("string" === typeof item) resultClasses.push(prefix + item);
            }));
            return resultClasses;
        }
        function addClasses() {
            const swiper = this;
            const {classNames, params, rtl, $el, device, support} = swiper;
            const suffixes = prepareClasses([ "initialized", params.direction, {
                "pointer-events": !support.touch
            }, {
                "free-mode": swiper.params.freeMode && params.freeMode.enabled
            }, {
                autoheight: params.autoHeight
            }, {
                rtl
            }, {
                grid: params.grid && params.grid.rows > 1
            }, {
                "grid-column": params.grid && params.grid.rows > 1 && "column" === params.grid.fill
            }, {
                android: device.android
            }, {
                ios: device.ios
            }, {
                "css-mode": params.cssMode
            }, {
                centered: params.cssMode && params.centeredSlides
            }, {
                "watch-progress": params.watchSlidesProgress
            } ], params.containerModifierClass);
            classNames.push(...suffixes);
            $el.addClass([ ...classNames ].join(" "));
            swiper.emitContainerClasses();
        }
        function removeClasses_removeClasses() {
            const swiper = this;
            const {$el, classNames} = swiper;
            $el.removeClass(classNames.join(" "));
            swiper.emitContainerClasses();
        }
        const classes = {
            addClasses,
            removeClasses: removeClasses_removeClasses
        };
        function loadImage(imageEl, src, srcset, sizes, checkForComplete, callback) {
            const window = ssr_window_esm_getWindow();
            let image;
            function onReady() {
                if (callback) callback();
            }
            const isPicture = dom(imageEl).parent("picture")[0];
            if (!isPicture && (!imageEl.complete || !checkForComplete)) if (src) {
                image = new window.Image;
                image.onload = onReady;
                image.onerror = onReady;
                if (sizes) image.sizes = sizes;
                if (srcset) image.srcset = srcset;
                if (src) image.src = src;
            } else onReady(); else onReady();
        }
        function preloadImages() {
            const swiper = this;
            swiper.imagesToLoad = swiper.$el.find("img");
            function onReady() {
                if ("undefined" === typeof swiper || null === swiper || !swiper || swiper.destroyed) return;
                if (void 0 !== swiper.imagesLoaded) swiper.imagesLoaded += 1;
                if (swiper.imagesLoaded === swiper.imagesToLoad.length) {
                    if (swiper.params.updateOnImagesReady) swiper.update();
                    swiper.emit("imagesReady");
                }
            }
            for (let i = 0; i < swiper.imagesToLoad.length; i += 1) {
                const imageEl = swiper.imagesToLoad[i];
                swiper.loadImage(imageEl, imageEl.currentSrc || imageEl.getAttribute("src"), imageEl.srcset || imageEl.getAttribute("srcset"), imageEl.sizes || imageEl.getAttribute("sizes"), true, onReady);
            }
        }
        const core_images = {
            loadImage,
            preloadImages
        };
        function checkOverflow() {
            const swiper = this;
            const {isLocked: wasLocked, params} = swiper;
            const {slidesOffsetBefore} = params;
            if (slidesOffsetBefore) {
                const lastSlideIndex = swiper.slides.length - 1;
                const lastSlideRightEdge = swiper.slidesGrid[lastSlideIndex] + swiper.slidesSizesGrid[lastSlideIndex] + 2 * slidesOffsetBefore;
                swiper.isLocked = swiper.size > lastSlideRightEdge;
            } else swiper.isLocked = 1 === swiper.snapGrid.length;
            if (true === params.allowSlideNext) swiper.allowSlideNext = !swiper.isLocked;
            if (true === params.allowSlidePrev) swiper.allowSlidePrev = !swiper.isLocked;
            if (wasLocked && wasLocked !== swiper.isLocked) swiper.isEnd = false;
            if (wasLocked !== swiper.isLocked) swiper.emit(swiper.isLocked ? "lock" : "unlock");
        }
        const check_overflow = {
            checkOverflow
        };
        const defaults = {
            init: true,
            direction: "horizontal",
            touchEventsTarget: "wrapper",
            initialSlide: 0,
            speed: 300,
            cssMode: false,
            updateOnWindowResize: true,
            resizeObserver: true,
            nested: false,
            createElements: false,
            enabled: true,
            focusableElements: "input, select, option, textarea, button, video, label",
            width: null,
            height: null,
            preventInteractionOnTransition: false,
            userAgent: null,
            url: null,
            edgeSwipeDetection: false,
            edgeSwipeThreshold: 20,
            autoHeight: false,
            setWrapperSize: false,
            virtualTranslate: false,
            effect: "slide",
            breakpoints: void 0,
            breakpointsBase: "window",
            spaceBetween: 0,
            slidesPerView: 1,
            slidesPerGroup: 1,
            slidesPerGroupSkip: 0,
            slidesPerGroupAuto: false,
            centeredSlides: false,
            centeredSlidesBounds: false,
            slidesOffsetBefore: 0,
            slidesOffsetAfter: 0,
            normalizeSlideIndex: true,
            centerInsufficientSlides: false,
            watchOverflow: true,
            roundLengths: false,
            touchRatio: 1,
            touchAngle: 45,
            simulateTouch: true,
            shortSwipes: true,
            longSwipes: true,
            longSwipesRatio: .5,
            longSwipesMs: 300,
            followFinger: true,
            allowTouchMove: true,
            threshold: 0,
            touchMoveStopPropagation: false,
            touchStartPreventDefault: true,
            touchStartForcePreventDefault: false,
            touchReleaseOnEdges: false,
            uniqueNavElements: true,
            resistance: true,
            resistanceRatio: .85,
            watchSlidesProgress: false,
            grabCursor: false,
            preventClicks: true,
            preventClicksPropagation: true,
            slideToClickedSlide: false,
            preloadImages: true,
            updateOnImagesReady: true,
            loop: false,
            loopAdditionalSlides: 0,
            loopedSlides: null,
            loopedSlidesLimit: true,
            loopFillGroupWithBlank: false,
            loopPreventsSlide: true,
            rewind: false,
            allowSlidePrev: true,
            allowSlideNext: true,
            swipeHandler: null,
            noSwiping: true,
            noSwipingClass: "swiper-no-swiping",
            noSwipingSelector: null,
            passiveListeners: true,
            maxBackfaceHiddenSlides: 10,
            containerModifierClass: "swiper-",
            slideClass: "swiper-slide",
            slideBlankClass: "swiper-slide-invisible-blank",
            slideActiveClass: "swiper-slide-active",
            slideDuplicateActiveClass: "swiper-slide-duplicate-active",
            slideVisibleClass: "swiper-slide-visible",
            slideDuplicateClass: "swiper-slide-duplicate",
            slideNextClass: "swiper-slide-next",
            slideDuplicateNextClass: "swiper-slide-duplicate-next",
            slidePrevClass: "swiper-slide-prev",
            slideDuplicatePrevClass: "swiper-slide-duplicate-prev",
            wrapperClass: "swiper-wrapper",
            runCallbacksOnInit: true,
            _emitClasses: false
        };
        function moduleExtendParams(params, allModulesParams) {
            return function extendParams(obj = {}) {
                const moduleParamName = Object.keys(obj)[0];
                const moduleParams = obj[moduleParamName];
                if ("object" !== typeof moduleParams || null === moduleParams) {
                    utils_extend(allModulesParams, obj);
                    return;
                }
                if ([ "navigation", "pagination", "scrollbar" ].indexOf(moduleParamName) >= 0 && true === params[moduleParamName]) params[moduleParamName] = {
                    auto: true
                };
                if (!(moduleParamName in params && "enabled" in moduleParams)) {
                    utils_extend(allModulesParams, obj);
                    return;
                }
                if (true === params[moduleParamName]) params[moduleParamName] = {
                    enabled: true
                };
                if ("object" === typeof params[moduleParamName] && !("enabled" in params[moduleParamName])) params[moduleParamName].enabled = true;
                if (!params[moduleParamName]) params[moduleParamName] = {
                    enabled: false
                };
                utils_extend(allModulesParams, obj);
            };
        }
        const prototypes = {
            eventsEmitter: events_emitter,
            update,
            translate,
            transition: core_transition,
            slide,
            loop,
            grabCursor: grab_cursor,
            events: core_events,
            breakpoints,
            checkOverflow: check_overflow,
            classes,
            images: core_images
        };
        const extendedDefaults = {};
        class core_Swiper {
            constructor(...args) {
                let el;
                let params;
                if (1 === args.length && args[0].constructor && "Object" === Object.prototype.toString.call(args[0]).slice(8, -1)) params = args[0]; else [el, params] = args;
                if (!params) params = {};
                params = utils_extend({}, params);
                if (el && !params.el) params.el = el;
                if (params.el && dom(params.el).length > 1) {
                    const swipers = [];
                    dom(params.el).each((containerEl => {
                        const newParams = utils_extend({}, params, {
                            el: containerEl
                        });
                        swipers.push(new core_Swiper(newParams));
                    }));
                    return swipers;
                }
                const swiper = this;
                swiper.__swiper__ = true;
                swiper.support = getSupport();
                swiper.device = getDevice({
                    userAgent: params.userAgent
                });
                swiper.browser = getBrowser();
                swiper.eventsListeners = {};
                swiper.eventsAnyListeners = [];
                swiper.modules = [ ...swiper.__modules__ ];
                if (params.modules && Array.isArray(params.modules)) swiper.modules.push(...params.modules);
                const allModulesParams = {};
                swiper.modules.forEach((mod => {
                    mod({
                        swiper,
                        extendParams: moduleExtendParams(params, allModulesParams),
                        on: swiper.on.bind(swiper),
                        once: swiper.once.bind(swiper),
                        off: swiper.off.bind(swiper),
                        emit: swiper.emit.bind(swiper)
                    });
                }));
                const swiperParams = utils_extend({}, defaults, allModulesParams);
                swiper.params = utils_extend({}, swiperParams, extendedDefaults, params);
                swiper.originalParams = utils_extend({}, swiper.params);
                swiper.passedParams = utils_extend({}, params);
                if (swiper.params && swiper.params.on) Object.keys(swiper.params.on).forEach((eventName => {
                    swiper.on(eventName, swiper.params.on[eventName]);
                }));
                if (swiper.params && swiper.params.onAny) swiper.onAny(swiper.params.onAny);
                swiper.$ = dom;
                Object.assign(swiper, {
                    enabled: swiper.params.enabled,
                    el,
                    classNames: [],
                    slides: dom(),
                    slidesGrid: [],
                    snapGrid: [],
                    slidesSizesGrid: [],
                    isHorizontal() {
                        return "horizontal" === swiper.params.direction;
                    },
                    isVertical() {
                        return "vertical" === swiper.params.direction;
                    },
                    activeIndex: 0,
                    realIndex: 0,
                    isBeginning: true,
                    isEnd: false,
                    translate: 0,
                    previousTranslate: 0,
                    progress: 0,
                    velocity: 0,
                    animating: false,
                    allowSlideNext: swiper.params.allowSlideNext,
                    allowSlidePrev: swiper.params.allowSlidePrev,
                    touchEvents: function touchEvents() {
                        const touch = [ "touchstart", "touchmove", "touchend", "touchcancel" ];
                        const desktop = [ "pointerdown", "pointermove", "pointerup" ];
                        swiper.touchEventsTouch = {
                            start: touch[0],
                            move: touch[1],
                            end: touch[2],
                            cancel: touch[3]
                        };
                        swiper.touchEventsDesktop = {
                            start: desktop[0],
                            move: desktop[1],
                            end: desktop[2]
                        };
                        return swiper.support.touch || !swiper.params.simulateTouch ? swiper.touchEventsTouch : swiper.touchEventsDesktop;
                    }(),
                    touchEventsData: {
                        isTouched: void 0,
                        isMoved: void 0,
                        allowTouchCallbacks: void 0,
                        touchStartTime: void 0,
                        isScrolling: void 0,
                        currentTranslate: void 0,
                        startTranslate: void 0,
                        allowThresholdMove: void 0,
                        focusableElements: swiper.params.focusableElements,
                        lastClickTime: utils_now(),
                        clickTimeout: void 0,
                        velocities: [],
                        allowMomentumBounce: void 0,
                        isTouchEvent: void 0,
                        startMoving: void 0
                    },
                    allowClick: true,
                    allowTouchMove: swiper.params.allowTouchMove,
                    touches: {
                        startX: 0,
                        startY: 0,
                        currentX: 0,
                        currentY: 0,
                        diff: 0
                    },
                    imagesToLoad: [],
                    imagesLoaded: 0
                });
                swiper.emit("_swiper");
                if (swiper.params.init) swiper.init();
                return swiper;
            }
            enable() {
                const swiper = this;
                if (swiper.enabled) return;
                swiper.enabled = true;
                if (swiper.params.grabCursor) swiper.setGrabCursor();
                swiper.emit("enable");
            }
            disable() {
                const swiper = this;
                if (!swiper.enabled) return;
                swiper.enabled = false;
                if (swiper.params.grabCursor) swiper.unsetGrabCursor();
                swiper.emit("disable");
            }
            setProgress(progress, speed) {
                const swiper = this;
                progress = Math.min(Math.max(progress, 0), 1);
                const min = swiper.minTranslate();
                const max = swiper.maxTranslate();
                const current = (max - min) * progress + min;
                swiper.translateTo(current, "undefined" === typeof speed ? 0 : speed);
                swiper.updateActiveIndex();
                swiper.updateSlidesClasses();
            }
            emitContainerClasses() {
                const swiper = this;
                if (!swiper.params._emitClasses || !swiper.el) return;
                const cls = swiper.el.className.split(" ").filter((className => 0 === className.indexOf("swiper") || 0 === className.indexOf(swiper.params.containerModifierClass)));
                swiper.emit("_containerClasses", cls.join(" "));
            }
            getSlideClasses(slideEl) {
                const swiper = this;
                if (swiper.destroyed) return "";
                return slideEl.className.split(" ").filter((className => 0 === className.indexOf("swiper-slide") || 0 === className.indexOf(swiper.params.slideClass))).join(" ");
            }
            emitSlidesClasses() {
                const swiper = this;
                if (!swiper.params._emitClasses || !swiper.el) return;
                const updates = [];
                swiper.slides.each((slideEl => {
                    const classNames = swiper.getSlideClasses(slideEl);
                    updates.push({
                        slideEl,
                        classNames
                    });
                    swiper.emit("_slideClass", slideEl, classNames);
                }));
                swiper.emit("_slideClasses", updates);
            }
            slidesPerViewDynamic(view = "current", exact = false) {
                const swiper = this;
                const {params, slides, slidesGrid, slidesSizesGrid, size: swiperSize, activeIndex} = swiper;
                let spv = 1;
                if (params.centeredSlides) {
                    let slideSize = slides[activeIndex].swiperSlideSize;
                    let breakLoop;
                    for (let i = activeIndex + 1; i < slides.length; i += 1) if (slides[i] && !breakLoop) {
                        slideSize += slides[i].swiperSlideSize;
                        spv += 1;
                        if (slideSize > swiperSize) breakLoop = true;
                    }
                    for (let i = activeIndex - 1; i >= 0; i -= 1) if (slides[i] && !breakLoop) {
                        slideSize += slides[i].swiperSlideSize;
                        spv += 1;
                        if (slideSize > swiperSize) breakLoop = true;
                    }
                } else if ("current" === view) for (let i = activeIndex + 1; i < slides.length; i += 1) {
                    const slideInView = exact ? slidesGrid[i] + slidesSizesGrid[i] - slidesGrid[activeIndex] < swiperSize : slidesGrid[i] - slidesGrid[activeIndex] < swiperSize;
                    if (slideInView) spv += 1;
                } else for (let i = activeIndex - 1; i >= 0; i -= 1) {
                    const slideInView = slidesGrid[activeIndex] - slidesGrid[i] < swiperSize;
                    if (slideInView) spv += 1;
                }
                return spv;
            }
            update() {
                const swiper = this;
                if (!swiper || swiper.destroyed) return;
                const {snapGrid, params} = swiper;
                if (params.breakpoints) swiper.setBreakpoint();
                swiper.updateSize();
                swiper.updateSlides();
                swiper.updateProgress();
                swiper.updateSlidesClasses();
                function setTranslate() {
                    const translateValue = swiper.rtlTranslate ? -1 * swiper.translate : swiper.translate;
                    const newTranslate = Math.min(Math.max(translateValue, swiper.maxTranslate()), swiper.minTranslate());
                    swiper.setTranslate(newTranslate);
                    swiper.updateActiveIndex();
                    swiper.updateSlidesClasses();
                }
                let translated;
                if (swiper.params.freeMode && swiper.params.freeMode.enabled) {
                    setTranslate();
                    if (swiper.params.autoHeight) swiper.updateAutoHeight();
                } else {
                    if (("auto" === swiper.params.slidesPerView || swiper.params.slidesPerView > 1) && swiper.isEnd && !swiper.params.centeredSlides) translated = swiper.slideTo(swiper.slides.length - 1, 0, false, true); else translated = swiper.slideTo(swiper.activeIndex, 0, false, true);
                    if (!translated) setTranslate();
                }
                if (params.watchOverflow && snapGrid !== swiper.snapGrid) swiper.checkOverflow();
                swiper.emit("update");
            }
            changeDirection(newDirection, needUpdate = true) {
                const swiper = this;
                const currentDirection = swiper.params.direction;
                if (!newDirection) newDirection = "horizontal" === currentDirection ? "vertical" : "horizontal";
                if (newDirection === currentDirection || "horizontal" !== newDirection && "vertical" !== newDirection) return swiper;
                swiper.$el.removeClass(`${swiper.params.containerModifierClass}${currentDirection}`).addClass(`${swiper.params.containerModifierClass}${newDirection}`);
                swiper.emitContainerClasses();
                swiper.params.direction = newDirection;
                swiper.slides.each((slideEl => {
                    if ("vertical" === newDirection) slideEl.style.width = ""; else slideEl.style.height = "";
                }));
                swiper.emit("changeDirection");
                if (needUpdate) swiper.update();
                return swiper;
            }
            changeLanguageDirection(direction) {
                const swiper = this;
                if (swiper.rtl && "rtl" === direction || !swiper.rtl && "ltr" === direction) return;
                swiper.rtl = "rtl" === direction;
                swiper.rtlTranslate = "horizontal" === swiper.params.direction && swiper.rtl;
                if (swiper.rtl) {
                    swiper.$el.addClass(`${swiper.params.containerModifierClass}rtl`);
                    swiper.el.dir = "rtl";
                } else {
                    swiper.$el.removeClass(`${swiper.params.containerModifierClass}rtl`);
                    swiper.el.dir = "ltr";
                }
                swiper.update();
            }
            mount(el) {
                const swiper = this;
                if (swiper.mounted) return true;
                const $el = dom(el || swiper.params.el);
                el = $el[0];
                if (!el) return false;
                el.swiper = swiper;
                const getWrapperSelector = () => `.${(swiper.params.wrapperClass || "").trim().split(" ").join(".")}`;
                const getWrapper = () => {
                    if (el && el.shadowRoot && el.shadowRoot.querySelector) {
                        const res = dom(el.shadowRoot.querySelector(getWrapperSelector()));
                        res.children = options => $el.children(options);
                        return res;
                    }
                    if (!$el.children) return dom($el).children(getWrapperSelector());
                    return $el.children(getWrapperSelector());
                };
                let $wrapperEl = getWrapper();
                if (0 === $wrapperEl.length && swiper.params.createElements) {
                    const document = ssr_window_esm_getDocument();
                    const wrapper = document.createElement("div");
                    $wrapperEl = dom(wrapper);
                    wrapper.className = swiper.params.wrapperClass;
                    $el.append(wrapper);
                    $el.children(`.${swiper.params.slideClass}`).each((slideEl => {
                        $wrapperEl.append(slideEl);
                    }));
                }
                Object.assign(swiper, {
                    $el,
                    el,
                    $wrapperEl,
                    wrapperEl: $wrapperEl[0],
                    mounted: true,
                    rtl: "rtl" === el.dir.toLowerCase() || "rtl" === $el.css("direction"),
                    rtlTranslate: "horizontal" === swiper.params.direction && ("rtl" === el.dir.toLowerCase() || "rtl" === $el.css("direction")),
                    wrongRTL: "-webkit-box" === $wrapperEl.css("display")
                });
                return true;
            }
            init(el) {
                const swiper = this;
                if (swiper.initialized) return swiper;
                const mounted = swiper.mount(el);
                if (false === mounted) return swiper;
                swiper.emit("beforeInit");
                if (swiper.params.breakpoints) swiper.setBreakpoint();
                swiper.addClasses();
                if (swiper.params.loop) swiper.loopCreate();
                swiper.updateSize();
                swiper.updateSlides();
                if (swiper.params.watchOverflow) swiper.checkOverflow();
                if (swiper.params.grabCursor && swiper.enabled) swiper.setGrabCursor();
                if (swiper.params.preloadImages) swiper.preloadImages();
                if (swiper.params.loop) swiper.slideTo(swiper.params.initialSlide + swiper.loopedSlides, 0, swiper.params.runCallbacksOnInit, false, true); else swiper.slideTo(swiper.params.initialSlide, 0, swiper.params.runCallbacksOnInit, false, true);
                swiper.attachEvents();
                swiper.initialized = true;
                swiper.emit("init");
                swiper.emit("afterInit");
                return swiper;
            }
            destroy(deleteInstance = true, cleanStyles = true) {
                const swiper = this;
                const {params, $el, $wrapperEl, slides} = swiper;
                if ("undefined" === typeof swiper.params || swiper.destroyed) return null;
                swiper.emit("beforeDestroy");
                swiper.initialized = false;
                swiper.detachEvents();
                if (params.loop) swiper.loopDestroy();
                if (cleanStyles) {
                    swiper.removeClasses();
                    $el.removeAttr("style");
                    $wrapperEl.removeAttr("style");
                    if (slides && slides.length) slides.removeClass([ params.slideVisibleClass, params.slideActiveClass, params.slideNextClass, params.slidePrevClass ].join(" ")).removeAttr("style").removeAttr("data-swiper-slide-index");
                }
                swiper.emit("destroy");
                Object.keys(swiper.eventsListeners).forEach((eventName => {
                    swiper.off(eventName);
                }));
                if (false !== deleteInstance) {
                    swiper.$el[0].swiper = null;
                    deleteProps(swiper);
                }
                swiper.destroyed = true;
                return null;
            }
            static extendDefaults(newDefaults) {
                utils_extend(extendedDefaults, newDefaults);
            }
            static get extendedDefaults() {
                return extendedDefaults;
            }
            static get defaults() {
                return defaults;
            }
            static installModule(mod) {
                if (!core_Swiper.prototype.__modules__) core_Swiper.prototype.__modules__ = [];
                const modules = core_Swiper.prototype.__modules__;
                if ("function" === typeof mod && modules.indexOf(mod) < 0) modules.push(mod);
            }
            static use(module) {
                if (Array.isArray(module)) {
                    module.forEach((m => core_Swiper.installModule(m)));
                    return core_Swiper;
                }
                core_Swiper.installModule(module);
                return core_Swiper;
            }
        }
        Object.keys(prototypes).forEach((prototypeGroup => {
            Object.keys(prototypes[prototypeGroup]).forEach((protoMethod => {
                core_Swiper.prototype[protoMethod] = prototypes[prototypeGroup][protoMethod];
            }));
        }));
        core_Swiper.use([ Resize, Observer ]);
        const core = core_Swiper;
        function create_element_if_not_defined_createElementIfNotDefined(swiper, originalParams, params, checkProps) {
            const document = ssr_window_esm_getDocument();
            if (swiper.params.createElements) Object.keys(checkProps).forEach((key => {
                if (!params[key] && true === params.auto) {
                    let element = swiper.$el.children(`.${checkProps[key]}`)[0];
                    if (!element) {
                        element = document.createElement("div");
                        element.className = checkProps[key];
                        swiper.$el.append(element);
                    }
                    params[key] = element;
                    originalParams[key] = element;
                }
            }));
            return params;
        }
        function Navigation({swiper, extendParams, on, emit}) {
            extendParams({
                navigation: {
                    nextEl: null,
                    prevEl: null,
                    hideOnClick: false,
                    disabledClass: "swiper-button-disabled",
                    hiddenClass: "swiper-button-hidden",
                    lockClass: "swiper-button-lock",
                    navigationDisabledClass: "swiper-navigation-disabled"
                }
            });
            swiper.navigation = {
                nextEl: null,
                $nextEl: null,
                prevEl: null,
                $prevEl: null
            };
            function getEl(el) {
                let $el;
                if (el) {
                    $el = dom(el);
                    if (swiper.params.uniqueNavElements && "string" === typeof el && $el.length > 1 && 1 === swiper.$el.find(el).length) $el = swiper.$el.find(el);
                }
                return $el;
            }
            function toggleEl($el, disabled) {
                const params = swiper.params.navigation;
                if ($el && $el.length > 0) {
                    $el[disabled ? "addClass" : "removeClass"](params.disabledClass);
                    if ($el[0] && "BUTTON" === $el[0].tagName) $el[0].disabled = disabled;
                    if (swiper.params.watchOverflow && swiper.enabled) $el[swiper.isLocked ? "addClass" : "removeClass"](params.lockClass);
                }
            }
            function update() {
                if (swiper.params.loop) return;
                const {$nextEl, $prevEl} = swiper.navigation;
                toggleEl($prevEl, swiper.isBeginning && !swiper.params.rewind);
                toggleEl($nextEl, swiper.isEnd && !swiper.params.rewind);
            }
            function onPrevClick(e) {
                e.preventDefault();
                if (swiper.isBeginning && !swiper.params.loop && !swiper.params.rewind) return;
                swiper.slidePrev();
                emit("navigationPrev");
            }
            function onNextClick(e) {
                e.preventDefault();
                if (swiper.isEnd && !swiper.params.loop && !swiper.params.rewind) return;
                swiper.slideNext();
                emit("navigationNext");
            }
            function init() {
                const params = swiper.params.navigation;
                swiper.params.navigation = create_element_if_not_defined_createElementIfNotDefined(swiper, swiper.originalParams.navigation, swiper.params.navigation, {
                    nextEl: "swiper-button-next",
                    prevEl: "swiper-button-prev"
                });
                if (!(params.nextEl || params.prevEl)) return;
                const $nextEl = getEl(params.nextEl);
                const $prevEl = getEl(params.prevEl);
                if ($nextEl && $nextEl.length > 0) $nextEl.on("click", onNextClick);
                if ($prevEl && $prevEl.length > 0) $prevEl.on("click", onPrevClick);
                Object.assign(swiper.navigation, {
                    $nextEl,
                    nextEl: $nextEl && $nextEl[0],
                    $prevEl,
                    prevEl: $prevEl && $prevEl[0]
                });
                if (!swiper.enabled) {
                    if ($nextEl) $nextEl.addClass(params.lockClass);
                    if ($prevEl) $prevEl.addClass(params.lockClass);
                }
            }
            function destroy() {
                const {$nextEl, $prevEl} = swiper.navigation;
                if ($nextEl && $nextEl.length) {
                    $nextEl.off("click", onNextClick);
                    $nextEl.removeClass(swiper.params.navigation.disabledClass);
                }
                if ($prevEl && $prevEl.length) {
                    $prevEl.off("click", onPrevClick);
                    $prevEl.removeClass(swiper.params.navigation.disabledClass);
                }
            }
            on("init", (() => {
                if (false === swiper.params.navigation.enabled) disable(); else {
                    init();
                    update();
                }
            }));
            on("toEdge fromEdge lock unlock", (() => {
                update();
            }));
            on("destroy", (() => {
                destroy();
            }));
            on("enable disable", (() => {
                const {$nextEl, $prevEl} = swiper.navigation;
                if ($nextEl) $nextEl[swiper.enabled ? "removeClass" : "addClass"](swiper.params.navigation.lockClass);
                if ($prevEl) $prevEl[swiper.enabled ? "removeClass" : "addClass"](swiper.params.navigation.lockClass);
            }));
            on("click", ((_s, e) => {
                const {$nextEl, $prevEl} = swiper.navigation;
                const targetEl = e.target;
                if (swiper.params.navigation.hideOnClick && !dom(targetEl).is($prevEl) && !dom(targetEl).is($nextEl)) {
                    if (swiper.pagination && swiper.params.pagination && swiper.params.pagination.clickable && (swiper.pagination.el === targetEl || swiper.pagination.el.contains(targetEl))) return;
                    let isHidden;
                    if ($nextEl) isHidden = $nextEl.hasClass(swiper.params.navigation.hiddenClass); else if ($prevEl) isHidden = $prevEl.hasClass(swiper.params.navigation.hiddenClass);
                    if (true === isHidden) emit("navigationShow"); else emit("navigationHide");
                    if ($nextEl) $nextEl.toggleClass(swiper.params.navigation.hiddenClass);
                    if ($prevEl) $prevEl.toggleClass(swiper.params.navigation.hiddenClass);
                }
            }));
            const enable = () => {
                swiper.$el.removeClass(swiper.params.navigation.navigationDisabledClass);
                init();
                update();
            };
            const disable = () => {
                swiper.$el.addClass(swiper.params.navigation.navigationDisabledClass);
                destroy();
            };
            Object.assign(swiper.navigation, {
                enable,
                disable,
                update,
                init,
                destroy
            });
        }
        function bildSliders() {
            let sliders = document.querySelectorAll('[class*="__swiper"]:not(.swiper-wrapper)');
            if (sliders) sliders.forEach((slider => {
                slider.parentElement.classList.add("swiper");
                slider.classList.add("swiper-wrapper");
                for (const slide of slider.children) slide.classList.add("swiper-slide");
            }));
        }
        function initSliders() {
            bildSliders();
            if (document.querySelector(".portfolio__slider")) new core(".portfolio__slider", {
                modules: [ Navigation ],
                observer: true,
                observeParents: true,
                slidesPerView: 3,
                spaceBetween: 56,
                speed: 800,
                navigation: {
                    prevEl: ".portfolio__arrow_left",
                    nextEl: ".portfolio__arrow_right"
                },
                breakpoints: {
                    0: {
                        slidesPerView: 1.1,
                        spaceBetween: 5,
                        autoHeight: true
                    },
                    400: {
                        slidesPerView: 1.2,
                        spaceBetween: 15,
                        autoHeight: true
                    },
                    650: {
                        slidesPerView: 2,
                        spaceBetween: 15
                    },
                    992: {
                        slidesPerView: 3,
                        spaceBetween: 20
                    },
                    1200: {
                        slidesPerView: 3,
                        spaceBetween: 56
                    }
                },
                on: {}
            });
        }
        window.addEventListener("load", (function(e) {
            initSliders();
        }));
        var fullpage = __webpack_require__(615);
        new fullpage("[data-fp]", {
            menu: "[data-fp-menu]",
            anchors: [ "home", "services", "portfolio", "experience", "blog" ],
            sectionSelector: "[data-fp-section]",
            credits: {
                enabled: false
            },
            scrollingSpeed: 600,
            easingcss3: "ease-out",
            scrollBar: false,
            scrollOverflow: true,
            normalScrollElements: ".content-career__body"
        });
        let addWindowScrollEvent = false;
        setTimeout((() => {
            if (addWindowScrollEvent) {
                let windowScroll = new Event("windowScroll");
                window.addEventListener("scroll", (function(e) {
                    document.dispatchEvent(windowScroll);
                }));
            }
        }), 0);
        const observer = new IntersectionObserver((entries => {
            entries.forEach((entry => {
                if (entry.isIntersecting) entry.target.classList.add("_active");
            }));
        }));
        observer.observe(document.querySelector(".content-skills__items"));
        observer.observe(document.querySelector(".skills__timeline"));
        window["FLS"] = true;
        isWebp();
        menuInit();
        tabs();
        formFieldsInit({
            viewPass: false
        });
        formSubmit();
    })();
})();