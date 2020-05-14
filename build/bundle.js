/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "./build/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/app.js":
/*!***********************!*\
  !*** ./src/js/app.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\nlet directoryPath = '.';\n\n// Application logic will begin once DOM content is loaded\nwindow.onload = () => {\n    const app = new main();\n};\nclass main {\n    constructor() {\n        this._buildSelections = new Map();\n        // Instantiate the viewers\n        this._viewer = new Communicator.WebViewer({\n            containerId: \"viewer\",\n            empty: true\n        });\n        this._compViewer = new Communicator.WebViewer({\n            containerId: \"comp-viewer\",\n            empty: true\n        });\n        this._viewer.start();\n        this._compViewer.start();\n        this._compViewer.setCallbacks({\n            modelStructureReady: () => {\n                // Background color for viewers\n                this._compViewer.view.setBackgroundColor(new Communicator.Color(33, 33, 33), new Communicator.Color(175, 175, 175));\n                this._compViewer.view.setBackfacesVisible(true);\n            }\n        });\n        this._viewer.setCallbacks({\n            modelStructureReady: () => {\n                // Background color for viewers\n                this._viewer.view.setBackgroundColor(new Communicator.Color(33, 33, 33), new Communicator.Color(175, 175, 175));\n                // Additional viewer options\n                this._viewer.view.setBackfacesVisible(true);\n                this._viewer.view.getAxisTriad().enable();\n                this._viewer.view.getNavCube().enable();\n                this._viewer.view.getNavCube().setAnchor(Communicator.OverlayAnchor.LowerRightCorner);\n                this._viewer.model.setEnableAutomaticUnitScaling(false);\n            },\n            selectionArray: selectionEvents => {\n                if (selectionEvents.length == 0) {\n                    return;\n                }\n                let handleOp = this._viewer.operatorManager.getOperator(Communicator.OperatorId.Handle);\n                handleOp.addHandles([selectionEvents[0].getSelection().getNodeId()]);\n                handleOp.showHandles();\n            }\n        }); // End Callbacks\n        // Gather attach point data and store in Map\n        this._frameAttachPoints = new Map();\n        fetch(directoryPath + '/data/attachPoints.json').then(resp => {\n            if (resp.ok) {\n                resp.json().then(data => {\n                    let nodeData = data.NodeData;\n                    let numEntries = nodeData.length;\n                    for (let i = 0; i < numEntries; ++i) {\n                        this._frameAttachPoints.set(nodeData[i].modelName, nodeData[i]);\n                    }\n                    ;\n                });\n            } else {\n                alert(\"Attach point data for this model was not found.\");\n            }\n        });\n        this.setEventListeners();\n    } // End app Constructor\n    // Function to load models\n    loadModelPreview(modelName, transform = undefined) {\n        this._compViewer.model.clear().then(() => {\n            const nodeName = \"Model-\" + modelName;\n            const modelNodeId = this._compViewer.model.createNode(null, nodeName);\n            this._compViewer.model.loadSubtreeFromScsFile(modelNodeId, directoryPath + \"/data/scs/\" + modelName + \".scs\").then(() => {\n                this._compViewer.view.fitWorld();\n            });\n        });\n    }\n    setEventListeners() {\n        let pills = document.getElementById(\"pills-tab\");\n        let pillsRefs = pills.getElementsByTagName(\"a\");\n        let pillsContent = document.getElementById(\"pills-tabContent\");\n        let contentPanes = pillsContent.getElementsByTagName(\"div\");\n        let modelThumbnails = pillsContent.getElementsByTagName(\"a\");\n        for (let ref of pillsRefs) {\n            ref.onclick = e => {\n                for (let ref of pillsRefs) {\n                    ref.classList.remove(\"active\", \"show\");\n                }\n                for (let pane of contentPanes) {\n                    pane.classList.remove(\"active\");\n                }\n                let elem = e.currentTarget;\n                elem.classList.add(\"active\");\n                let tag = elem.getAttribute(\"content-id\");\n                document.getElementById(tag).classList.add(\"show\", \"active\");\n            };\n        }\n        for (let thumbnail of modelThumbnails) {\n            let thumbnailElement = thumbnail;\n            thumbnailElement.onclick = e => {\n                e.preventDefault();\n                let elem = e.currentTarget;\n                let modelToLoad = elem.getAttribute(\"model\");\n                if (modelToLoad === null) {\n                    alert(\"This component is currently unavailable. Please select another component.\");\n                } else {\n                    let component = elem.parentElement.id;\n                    // Load the model into the scene when clicked\n                    this.loadModelPreview(modelToLoad);\n                    this._componentType = component;\n                    this._selectedComponent = modelToLoad;\n                    this._selectedComponentName = elem.getAttribute(\"name\");\n                }\n            };\n        }\n        document.getElementById(\"add-to-build-btn\").onclick = () => {\n            if (!this._componentType || !this._selectedComponent || !this._selectedComponentName) {\n                alert(\"No component has been selected to add to build. Please select a component to add.\");\n                return;\n            }\n            let model = this._viewer.model;\n            this._buildSelections.set(this._componentType, this._selectedComponent);\n            let frameBase = this._buildSelections.get(\"frame\");\n            if (frameBase === undefined) {\n                alert(\"Please select a frame before adding other components to your build.\");\n                return;\n            }\n            const nodeName = \"Model-\" + this._componentType;\n            let componentSubtrees = model.getNodeChildren(model.getAbsoluteRootNode());\n            // Build the transform matrix for the part to place it in the right spot when added\n            let rawMatData = this._frameAttachPoints.get(frameBase)[this._componentType];\n            let transformMatrix = this._componentType === \"frame\" ? null : Communicator.Matrix.createFromArray(Object.values(rawMatData));\n            // First time frame is selected\n            if (componentSubtrees.length === 0 && this._componentType === \"frame\") {\n                const modelNodeId = model.createNode(null, nodeName);\n                model.loadSubtreeFromScsFile(modelNodeId, directoryPath + `/data/scs/${this._selectedComponent}.scs`);\n            }\n            // For all other components, identify if the same type component has already been added.\n            // If so, delete the existing node, and load the new node into the same nodeId and name.\n            // Otherwise, create a new node off the absolute root\n            else {\n                    let nodeExists = false;\n                    for (let nodeId of componentSubtrees) {\n                        if (model.getNodeName(nodeId) === nodeName) {\n                            nodeExists = true;\n                            model.deleteNode(nodeId).then(() => {\n                                let promiseArray = [];\n                                const modelNodeId = model.createNode(null, nodeName, nodeId, transformMatrix);\n                                promiseArray.push(model.loadSubtreeFromScsFile(modelNodeId, directoryPath + `/data/scs/${this._selectedComponent}.scs`));\n                                if (this._componentType === \"frame\") {\n                                    promiseArray.push(model.setNodesVisibility([model.getAbsoluteRootNode()], false));\n                                    let componentSubtrees = model.getNodeChildren(model.getAbsoluteRootNode());\n                                    // Frame selection change - update the component attach points\n                                    for (let nodeId of componentSubtrees) {\n                                        let nodeName = model.getNodeName(nodeId);\n                                        let nodeType = nodeName.slice(6);\n                                        if (nodeType === \"frame\") continue;\n                                        let rawMatData = this._frameAttachPoints.get(frameBase)[nodeType];\n                                        let transformMatrix = Communicator.Matrix.createFromArray(Object.values(rawMatData));\n                                        promiseArray.push(model.setNodeMatrix(nodeId, transformMatrix));\n                                    }\n                                    Promise.all(promiseArray).then(() => {\n                                        this._viewer.view.setBoundingCalculationIgnoresInvisible(false);\n                                        this._viewer.view.fitWorld(0).then(() => model.setNodesVisibility([model.getAbsoluteRootNode()], true));\n                                    });\n                                }\n                                return;\n                            });\n                        }\n                    }\n                    if (!nodeExists) {\n                        const modelNodeId = model.createNode(null, nodeName, null, transformMatrix);\n                        this._viewer.model.loadSubtreeFromScsFile(modelNodeId, directoryPath + `/data/scs/${this._selectedComponent}.scs`);\n                    }\n                }\n            document.getElementById(`breakdown-${this._componentType}`).innerHTML = this._selectedComponentName;\n        };\n        document.getElementById(\"reset-build-btn\").onclick = () => {\n            let opt = confirm(\"Are you sure would you like to reset your build? (This will clear all current selections!)\");\n            if (opt) {\n                this._viewer.model.clear();\n                document.getElementById(\"breakdown-frame\").innerHTML = \"Not Selected\";\n                document.getElementById(\"breakdown-fork\").innerHTML = \"Not Selected\";\n                document.getElementById(\"breakdown-frontwheel\").innerHTML = \"Not Selected\";\n                document.getElementById(\"breakdown-rearwheel\").innerHTML = \"Not Selected\";\n                document.getElementById(\"breakdown-seat\").innerHTML = \"Not Selected\";\n                document.getElementById(\"breakdown-crankset\").innerHTML = \"Not Selected\";\n                document.getElementById(\"breakdown-handlebar\").innerHTML = \"Not Selected\";\n            }\n            this._buildSelections.clear();\n        };\n        window.onresize = () => {\n            this._viewer.resizeCanvas();\n            this._compViewer.resizeCanvas();\n        };\n    } // End setting event handlers \n} // End app class\n\n//# sourceURL=webpack:///./src/js/app.js?");

/***/ })

/******/ });