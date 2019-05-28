/******/ (function(modules) { // webpackBootstrap
    /******/ 	function hotDisposeChunk(chunkId) {
        /******/ 		delete installedChunks[chunkId];
        /******/ 	}
    /******/ 	var parentHotUpdateCallback = window["webpackHotUpdate"];
    /******/ 	window["webpackHotUpdate"] = // eslint-disable-next-line no-unused-vars
        /******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
        /******/ 		hotAddUpdateChunk(chunkId, moreModules);
        /******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
        /******/ 	} ;
    /******/
    /******/ 	// eslint-disable-next-line no-unused-vars
    /******/ 	function hotDownloadUpdateChunk(chunkId) {
        /******/ 		var head = document.getElementsByTagName("head")[0];
        /******/ 		var script = document.createElement("script");
        /******/ 		script.charset = "utf-8";
        /******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
        /******/ 		;
        /******/ 		head.appendChild(script);
        /******/ 	}
    /******/
    /******/ 	// eslint-disable-next-line no-unused-vars
    /******/ 	function hotDownloadManifest(requestTimeout) {
        /******/ 		requestTimeout = requestTimeout || 10000;
        /******/ 		return new Promise(function(resolve, reject) {
            /******/ 			if (typeof XMLHttpRequest === "undefined")
            /******/ 				return reject(new Error("No browser support"));
            /******/ 			try {
                /******/ 				var request = new XMLHttpRequest();
                /******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
                /******/ 				request.open("GET", requestPath, true);
                /******/ 				request.timeout = requestTimeout;
                /******/ 				request.send(null);
                /******/ 			} catch (err) {
                /******/ 				return reject(err);
                /******/ 			}
            /******/ 			request.onreadystatechange = function() {
                /******/ 				if (request.readyState !== 4) return;
                /******/ 				if (request.status === 0) {
                    /******/ 					// timeout
                    /******/ 					reject(
                        /******/ 						new Error("Manifest request to " + requestPath + " timed out.")
                        /******/ 					);
                    /******/ 				} else if (request.status === 404) {
                    /******/ 					// no update available
                    /******/ 					resolve();
                    /******/ 				} else if (request.status !== 200 && request.status !== 304) {
                    /******/ 					// other failure
                    /******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
                    /******/ 				} else {
                    /******/ 					// success
                    /******/ 					try {
                        /******/ 						var update = JSON.parse(request.responseText);
                        /******/ 					} catch (e) {
                        /******/ 						reject(e);
                        /******/ 						return;
                        /******/ 					}
                    /******/ 					resolve(update);
                    /******/ 				}
                /******/ 			};
            /******/ 		});
        /******/ 	}
    /******/
    /******/ 	var hotApplyOnUpdate = true;
    /******/ 	var hotCurrentHash = "95a5ad6ef7492d040a47"; // eslint-disable-line no-unused-vars
    /******/ 	var hotRequestTimeout = 10000;
    /******/ 	var hotCurrentModuleData = {};
    /******/ 	var hotCurrentChildModule; // eslint-disable-line no-unused-vars
    /******/ 	var hotCurrentParents = []; // eslint-disable-line no-unused-vars
    /******/ 	var hotCurrentParentsTemp = []; // eslint-disable-line no-unused-vars
    /******/
    /******/ 	// eslint-disable-next-line no-unused-vars
    /******/ 	function hotCreateRequire(moduleId) {
        /******/ 		var me = installedModules[moduleId];
        /******/ 		if (!me) return __webpack_require__;
        /******/ 		var fn = function(request) {
            /******/ 			if (me.hot.active) {
                /******/ 				if (installedModules[request]) {
                    /******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1)
                    /******/ 						installedModules[request].parents.push(moduleId);
                    /******/ 				} else {
                    /******/ 					hotCurrentParents = [moduleId];
                    /******/ 					hotCurrentChildModule = request;
                    /******/ 				}
                /******/ 				if (me.children.indexOf(request) === -1) me.children.push(request);
                /******/ 			} else {
                /******/ 				console.warn(
                    /******/ 					"[HMR] unexpected require(" +
                    /******/ 						request +
                    /******/ 						") from disposed module " +
                    /******/ 						moduleId
                    /******/ 				);
                /******/ 				hotCurrentParents = [];
                /******/ 			}
            /******/ 			return __webpack_require__(request);
            /******/ 		};
        /******/ 		var ObjectFactory = function ObjectFactory(name) {
            /******/ 			return {
                /******/ 				configurable: true,
                /******/ 				enumerable: true,
                /******/ 				get: function() {
                    /******/ 					return __webpack_require__[name];
                    /******/ 				},
                /******/ 				set: function(value) {
                    /******/ 					__webpack_require__[name] = value;
                    /******/ 				}
                /******/ 			};
            /******/ 		};
        /******/ 		for (var name in __webpack_require__) {
            /******/ 			if (
                /******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
                /******/ 				name !== "e"
            /******/ 			) {
                /******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
                /******/ 			}
            /******/ 		}
        /******/ 		fn.e = function(chunkId) {
            /******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
            /******/ 			hotChunksLoading++;
            /******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
                /******/ 				finishChunkLoading();
                /******/ 				throw err;
                /******/ 			});
            /******/
            /******/ 			function finishChunkLoading() {
                /******/ 				hotChunksLoading--;
                /******/ 				if (hotStatus === "prepare") {
                    /******/ 					if (!hotWaitingFilesMap[chunkId]) {
                        /******/ 						hotEnsureUpdateChunk(chunkId);
                        /******/ 					}
                    /******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
                        /******/ 						hotUpdateDownloaded();
                        /******/ 					}
                    /******/ 				}
                /******/ 			}
            /******/ 		};
        /******/ 		return fn;
        /******/ 	}
    /******/
    /******/ 	// eslint-disable-next-line no-unused-vars
    /******/ 	function hotCreateModule(moduleId) {
        /******/ 		var hot = {
            /******/ 			// private stuff
            /******/ 			_acceptedDependencies: {},
            /******/ 			_declinedDependencies: {},
            /******/ 			_selfAccepted: false,
            /******/ 			_selfDeclined: false,
            /******/ 			_disposeHandlers: [],
            /******/ 			_main: hotCurrentChildModule !== moduleId,
            /******/
            /******/ 			// Module API
            /******/ 			active: true,
            /******/ 			accept: function(dep, callback) {
                /******/ 				if (typeof dep === "undefined") hot._selfAccepted = true;
                /******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
                /******/ 				else if (typeof dep === "object")
                /******/ 					for (var i = 0; i < dep.length; i++)
                        /******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
                /******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
                /******/ 			},
            /******/ 			decline: function(dep) {
                /******/ 				if (typeof dep === "undefined") hot._selfDeclined = true;
                /******/ 				else if (typeof dep === "object")
                /******/ 					for (var i = 0; i < dep.length; i++)
                        /******/ 						hot._declinedDependencies[dep[i]] = true;
                /******/ 				else hot._declinedDependencies[dep] = true;
                /******/ 			},
            /******/ 			dispose: function(callback) {
                /******/ 				hot._disposeHandlers.push(callback);
                /******/ 			},
            /******/ 			addDisposeHandler: function(callback) {
                /******/ 				hot._disposeHandlers.push(callback);
                /******/ 			},
            /******/ 			removeDisposeHandler: function(callback) {
                /******/ 				var idx = hot._disposeHandlers.indexOf(callback);
                /******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
                /******/ 			},
            /******/
            /******/ 			// Management API
            /******/ 			check: hotCheck,
            /******/ 			apply: hotApply,
            /******/ 			status: function(l) {
                /******/ 				if (!l) return hotStatus;
                /******/ 				hotStatusHandlers.push(l);
                /******/ 			},
            /******/ 			addStatusHandler: function(l) {
                /******/ 				hotStatusHandlers.push(l);
                /******/ 			},
            /******/ 			removeStatusHandler: function(l) {
                /******/ 				var idx = hotStatusHandlers.indexOf(l);
                /******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
                /******/ 			},
            /******/
            /******/ 			//inherit from previous dispose call
            /******/ 			data: hotCurrentModuleData[moduleId]
            /******/ 		};
        /******/ 		hotCurrentChildModule = undefined;
        /******/ 		return hot;
        /******/ 	}
    /******/
    /******/ 	var hotStatusHandlers = [];
    /******/ 	var hotStatus = "idle";
    /******/
    /******/ 	function hotSetStatus(newStatus) {
        /******/ 		hotStatus = newStatus;
        /******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
            /******/ 			hotStatusHandlers[i].call(null, newStatus);
        /******/ 	}
    /******/
    /******/ 	// while downloading
    /******/ 	var hotWaitingFiles = 0;
    /******/ 	var hotChunksLoading = 0;
    /******/ 	var hotWaitingFilesMap = {};
    /******/ 	var hotRequestedFilesMap = {};
    /******/ 	var hotAvailableFilesMap = {};
    /******/ 	var hotDeferred;
    /******/
    /******/ 	// The update info
    /******/ 	var hotUpdate, hotUpdateNewHash;
    /******/
    /******/ 	function toModuleId(id) {
        /******/ 		var isNumber = +id + "" === id;
        /******/ 		return isNumber ? +id : id;
        /******/ 	}
    /******/
    /******/ 	function hotCheck(apply) {
        /******/ 		if (hotStatus !== "idle")
        /******/ 			throw new Error("check() is only allowed in idle status");
        /******/ 		hotApplyOnUpdate = apply;
        /******/ 		hotSetStatus("check");
        /******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
            /******/ 			if (!update) {
                /******/ 				hotSetStatus("idle");
                /******/ 				return null;
                /******/ 			}
            /******/ 			hotRequestedFilesMap = {};
            /******/ 			hotWaitingFilesMap = {};
            /******/ 			hotAvailableFilesMap = update.c;
            /******/ 			hotUpdateNewHash = update.h;
            /******/
            /******/ 			hotSetStatus("prepare");
            /******/ 			var promise = new Promise(function(resolve, reject) {
                /******/ 				hotDeferred = {
                    /******/ 					resolve: resolve,
                    /******/ 					reject: reject
                    /******/ 				};
                /******/ 			});
            /******/ 			hotUpdate = {};
            /******/ 			var chunkId = "main";
            /******/ 			{
                /******/ 				// eslint-disable-line no-lone-blocks
                /******/ 				/*globals chunkId */
                /******/ 				hotEnsureUpdateChunk(chunkId);
                /******/ 			}
            /******/ 			if (
                /******/ 				hotStatus === "prepare" &&
                /******/ 				hotChunksLoading === 0 &&
                /******/ 				hotWaitingFiles === 0
            /******/ 			) {
                /******/ 				hotUpdateDownloaded();
                /******/ 			}
            /******/ 			return promise;
            /******/ 		});
        /******/ 	}
    /******/
    /******/ 	// eslint-disable-next-line no-unused-vars
    /******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
        /******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
        /******/ 			return;
        /******/ 		hotRequestedFilesMap[chunkId] = false;
        /******/ 		for (var moduleId in moreModules) {
            /******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
                /******/ 				hotUpdate[moduleId] = moreModules[moduleId];
                /******/ 			}
            /******/ 		}
        /******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
            /******/ 			hotUpdateDownloaded();
            /******/ 		}
        /******/ 	}
    /******/
    /******/ 	function hotEnsureUpdateChunk(chunkId) {
        /******/ 		if (!hotAvailableFilesMap[chunkId]) {
            /******/ 			hotWaitingFilesMap[chunkId] = true;
            /******/ 		} else {
            /******/ 			hotRequestedFilesMap[chunkId] = true;
            /******/ 			hotWaitingFiles++;
            /******/ 			hotDownloadUpdateChunk(chunkId);
            /******/ 		}
        /******/ 	}
    /******/
    /******/ 	function hotUpdateDownloaded() {
        /******/ 		hotSetStatus("ready");
        /******/ 		var deferred = hotDeferred;
        /******/ 		hotDeferred = null;
        /******/ 		if (!deferred) return;
        /******/ 		if (hotApplyOnUpdate) {
            /******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
            /******/ 			// avoid triggering uncaught exception warning in Chrome.
            /******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
            /******/ 			Promise.resolve()
            /******/ 				.then(function() {
                /******/ 					return hotApply(hotApplyOnUpdate);
                /******/ 				})
            /******/ 				.then(
                /******/ 					function(result) {
                    /******/ 						deferred.resolve(result);
                    /******/ 					},
                /******/ 					function(err) {
                    /******/ 						deferred.reject(err);
                    /******/ 					}
                /******/ 				);
            /******/ 		} else {
            /******/ 			var outdatedModules = [];
            /******/ 			for (var id in hotUpdate) {
                /******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
                    /******/ 					outdatedModules.push(toModuleId(id));
                    /******/ 				}
                /******/ 			}
            /******/ 			deferred.resolve(outdatedModules);
            /******/ 		}
        /******/ 	}
    /******/
    /******/ 	function hotApply(options) {
        /******/ 		if (hotStatus !== "ready")
        /******/ 			throw new Error("apply() is only allowed in ready status");
        /******/ 		options = options || {};
        /******/
        /******/ 		var cb;
        /******/ 		var i;
        /******/ 		var j;
        /******/ 		var module;
        /******/ 		var moduleId;
        /******/
        /******/ 		function getAffectedStuff(updateModuleId) {
            /******/ 			var outdatedModules = [updateModuleId];
            /******/ 			var outdatedDependencies = {};
            /******/
            /******/ 			var queue = outdatedModules.slice().map(function(id) {
                /******/ 				return {
                    /******/ 					chain: [id],
                    /******/ 					id: id
                    /******/ 				};
                /******/ 			});
            /******/ 			while (queue.length > 0) {
                /******/ 				var queueItem = queue.pop();
                /******/ 				var moduleId = queueItem.id;
                /******/ 				var chain = queueItem.chain;
                /******/ 				module = installedModules[moduleId];
                /******/ 				if (!module || module.hot._selfAccepted) continue;
                /******/ 				if (module.hot._selfDeclined) {
                    /******/ 					return {
                        /******/ 						type: "self-declined",
                        /******/ 						chain: chain,
                        /******/ 						moduleId: moduleId
                        /******/ 					};
                    /******/ 				}
                /******/ 				if (module.hot._main) {
                    /******/ 					return {
                        /******/ 						type: "unaccepted",
                        /******/ 						chain: chain,
                        /******/ 						moduleId: moduleId
                        /******/ 					};
                    /******/ 				}
                /******/ 				for (var i = 0; i < module.parents.length; i++) {
                    /******/ 					var parentId = module.parents[i];
                    /******/ 					var parent = installedModules[parentId];
                    /******/ 					if (!parent) continue;
                    /******/ 					if (parent.hot._declinedDependencies[moduleId]) {
                        /******/ 						return {
                            /******/ 							type: "declined",
                            /******/ 							chain: chain.concat([parentId]),
                            /******/ 							moduleId: moduleId,
                            /******/ 							parentId: parentId
                            /******/ 						};
                        /******/ 					}
                    /******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
                    /******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
                        /******/ 						if (!outdatedDependencies[parentId])
                        /******/ 							outdatedDependencies[parentId] = [];
                        /******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
                        /******/ 						continue;
                        /******/ 					}
                    /******/ 					delete outdatedDependencies[parentId];
                    /******/ 					outdatedModules.push(parentId);
                    /******/ 					queue.push({
                        /******/ 						chain: chain.concat([parentId]),
                        /******/ 						id: parentId
                        /******/ 					});
                    /******/ 				}
                /******/ 			}
            /******/
            /******/ 			return {
                /******/ 				type: "accepted",
                /******/ 				moduleId: updateModuleId,
                /******/ 				outdatedModules: outdatedModules,
                /******/ 				outdatedDependencies: outdatedDependencies
                /******/ 			};
            /******/ 		}
        /******/
        /******/ 		function addAllToSet(a, b) {
            /******/ 			for (var i = 0; i < b.length; i++) {
                /******/ 				var item = b[i];
                /******/ 				if (a.indexOf(item) === -1) a.push(item);
                /******/ 			}
            /******/ 		}
        /******/
        /******/ 		// at begin all updates modules are outdated
        /******/ 		// the "outdated" status can propagate to parents if they don't accept the children
        /******/ 		var outdatedDependencies = {};
        /******/ 		var outdatedModules = [];
        /******/ 		var appliedUpdate = {};
        /******/
        /******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
            /******/ 			console.warn(
                /******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
                /******/ 			);
            /******/ 		};
        /******/
        /******/ 		for (var id in hotUpdate) {
            /******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
                /******/ 				moduleId = toModuleId(id);
                /******/ 				/** @type {any} */
                /******/ 				var result;
                /******/ 				if (hotUpdate[id]) {
                    /******/ 					result = getAffectedStuff(moduleId);
                    /******/ 				} else {
                    /******/ 					result = {
                        /******/ 						type: "disposed",
                        /******/ 						moduleId: id
                        /******/ 					};
                    /******/ 				}
                /******/ 				/** @type {Error|false} */
                /******/ 				var abortError = false;
                /******/ 				var doApply = false;
                /******/ 				var doDispose = false;
                /******/ 				var chainInfo = "";
                /******/ 				if (result.chain) {
                    /******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
                    /******/ 				}
                /******/ 				switch (result.type) {
                    /******/ 					case "self-declined":
                        /******/ 						if (options.onDeclined) options.onDeclined(result);
                        /******/ 						if (!options.ignoreDeclined)
                        /******/ 							abortError = new Error(
                                /******/ 								"Aborted because of self decline: " +
                                /******/ 									result.moduleId +
                                /******/ 									chainInfo
                                /******/ 							);
                        /******/ 						break;
                    /******/ 					case "declined":
                        /******/ 						if (options.onDeclined) options.onDeclined(result);
                        /******/ 						if (!options.ignoreDeclined)
                        /******/ 							abortError = new Error(
                                /******/ 								"Aborted because of declined dependency: " +
                                /******/ 									result.moduleId +
                                /******/ 									" in " +
                                /******/ 									result.parentId +
                                /******/ 									chainInfo
                                /******/ 							);
                        /******/ 						break;
                    /******/ 					case "unaccepted":
                        /******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
                        /******/ 						if (!options.ignoreUnaccepted)
                        /******/ 							abortError = new Error(
                                /******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
                                /******/ 							);
                        /******/ 						break;
                    /******/ 					case "accepted":
                        /******/ 						if (options.onAccepted) options.onAccepted(result);
                        /******/ 						doApply = true;
                        /******/ 						break;
                    /******/ 					case "disposed":
                        /******/ 						if (options.onDisposed) options.onDisposed(result);
                        /******/ 						doDispose = true;
                        /******/ 						break;
                    /******/ 					default:
                        /******/ 						throw new Error("Unexception type " + result.type);
                    /******/ 				}
                /******/ 				if (abortError) {
                    /******/ 					hotSetStatus("abort");
                    /******/ 					return Promise.reject(abortError);
                    /******/ 				}
                /******/ 				if (doApply) {
                    /******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
                    /******/ 					addAllToSet(outdatedModules, result.outdatedModules);
                    /******/ 					for (moduleId in result.outdatedDependencies) {
                        /******/ 						if (
                            /******/ 							Object.prototype.hasOwnProperty.call(
                            /******/ 								result.outdatedDependencies,
                            /******/ 								moduleId
                            /******/ 							)
                        /******/ 						) {
                            /******/ 							if (!outdatedDependencies[moduleId])
                            /******/ 								outdatedDependencies[moduleId] = [];
                            /******/ 							addAllToSet(
                                /******/ 								outdatedDependencies[moduleId],
                                /******/ 								result.outdatedDependencies[moduleId]
                                /******/ 							);
                            /******/ 						}
                        /******/ 					}
                    /******/ 				}
                /******/ 				if (doDispose) {
                    /******/ 					addAllToSet(outdatedModules, [result.moduleId]);
                    /******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
                    /******/ 				}
                /******/ 			}
            /******/ 		}
        /******/
        /******/ 		// Store self accepted outdated modules to require them later by the module system
        /******/ 		var outdatedSelfAcceptedModules = [];
        /******/ 		for (i = 0; i < outdatedModules.length; i++) {
            /******/ 			moduleId = outdatedModules[i];
            /******/ 			if (
                /******/ 				installedModules[moduleId] &&
                /******/ 				installedModules[moduleId].hot._selfAccepted
            /******/ 			)
            /******/ 				outdatedSelfAcceptedModules.push({
                    /******/ 					module: moduleId,
                    /******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
                    /******/ 				});
            /******/ 		}
        /******/
        /******/ 		// Now in "dispose" phase
        /******/ 		hotSetStatus("dispose");
        /******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
            /******/ 			if (hotAvailableFilesMap[chunkId] === false) {
                /******/ 				hotDisposeChunk(chunkId);
                /******/ 			}
            /******/ 		});
        /******/
        /******/ 		var idx;
        /******/ 		var queue = outdatedModules.slice();
        /******/ 		while (queue.length > 0) {
            /******/ 			moduleId = queue.pop();
            /******/ 			module = installedModules[moduleId];
            /******/ 			if (!module) continue;
            /******/
            /******/ 			var data = {};
            /******/
            /******/ 			// Call dispose handlers
            /******/ 			var disposeHandlers = module.hot._disposeHandlers;
            /******/ 			for (j = 0; j < disposeHandlers.length; j++) {
                /******/ 				cb = disposeHandlers[j];
                /******/ 				cb(data);
                /******/ 			}
            /******/ 			hotCurrentModuleData[moduleId] = data;
            /******/
            /******/ 			// disable module (this disables requires from this module)
            /******/ 			module.hot.active = false;
            /******/
            /******/ 			// remove module from cache
            /******/ 			delete installedModules[moduleId];
            /******/
            /******/ 			// when disposing there is no need to call dispose handler
            /******/ 			delete outdatedDependencies[moduleId];
            /******/
            /******/ 			// remove "parents" references from all children
            /******/ 			for (j = 0; j < module.children.length; j++) {
                /******/ 				var child = installedModules[module.children[j]];
                /******/ 				if (!child) continue;
                /******/ 				idx = child.parents.indexOf(moduleId);
                /******/ 				if (idx >= 0) {
                    /******/ 					child.parents.splice(idx, 1);
                    /******/ 				}
                /******/ 			}
            /******/ 		}
        /******/
        /******/ 		// remove outdated dependency from module children
        /******/ 		var dependency;
        /******/ 		var moduleOutdatedDependencies;
        /******/ 		for (moduleId in outdatedDependencies) {
            /******/ 			if (
                /******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
            /******/ 			) {
                /******/ 				module = installedModules[moduleId];
                /******/ 				if (module) {
                    /******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
                    /******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
                        /******/ 						dependency = moduleOutdatedDependencies[j];
                        /******/ 						idx = module.children.indexOf(dependency);
                        /******/ 						if (idx >= 0) module.children.splice(idx, 1);
                        /******/ 					}
                    /******/ 				}
                /******/ 			}
            /******/ 		}
        /******/
        /******/ 		// Not in "apply" phase
        /******/ 		hotSetStatus("apply");
        /******/
        /******/ 		hotCurrentHash = hotUpdateNewHash;
        /******/
        /******/ 		// insert new code
        /******/ 		for (moduleId in appliedUpdate) {
            /******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
                /******/ 				modules[moduleId] = appliedUpdate[moduleId];
                /******/ 			}
            /******/ 		}
        /******/
        /******/ 		// call accept handlers
        /******/ 		var error = null;
        /******/ 		for (moduleId in outdatedDependencies) {
            /******/ 			if (
                /******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
            /******/ 			) {
                /******/ 				module = installedModules[moduleId];
                /******/ 				if (module) {
                    /******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
                    /******/ 					var callbacks = [];
                    /******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
                        /******/ 						dependency = moduleOutdatedDependencies[i];
                        /******/ 						cb = module.hot._acceptedDependencies[dependency];
                        /******/ 						if (cb) {
                            /******/ 							if (callbacks.indexOf(cb) !== -1) continue;
                            /******/ 							callbacks.push(cb);
                            /******/ 						}
                        /******/ 					}
                    /******/ 					for (i = 0; i < callbacks.length; i++) {
                        /******/ 						cb = callbacks[i];
                        /******/ 						try {
                            /******/ 							cb(moduleOutdatedDependencies);
                            /******/ 						} catch (err) {
                            /******/ 							if (options.onErrored) {
                                /******/ 								options.onErrored({
                                    /******/ 									type: "accept-errored",
                                    /******/ 									moduleId: moduleId,
                                    /******/ 									dependencyId: moduleOutdatedDependencies[i],
                                    /******/ 									error: err
                                    /******/ 								});
                                /******/ 							}
                            /******/ 							if (!options.ignoreErrored) {
                                /******/ 								if (!error) error = err;
                                /******/ 							}
                            /******/ 						}
                        /******/ 					}
                    /******/ 				}
                /******/ 			}
            /******/ 		}
        /******/
        /******/ 		// Load self accepted modules
        /******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
            /******/ 			var item = outdatedSelfAcceptedModules[i];
            /******/ 			moduleId = item.module;
            /******/ 			hotCurrentParents = [moduleId];
            /******/ 			try {
                /******/ 				__webpack_require__(moduleId);
                /******/ 			} catch (err) {
                /******/ 				if (typeof item.errorHandler === "function") {
                    /******/ 					try {
                        /******/ 						item.errorHandler(err);
                        /******/ 					} catch (err2) {
                        /******/ 						if (options.onErrored) {
                            /******/ 							options.onErrored({
                                /******/ 								type: "self-accept-error-handler-errored",
                                /******/ 								moduleId: moduleId,
                                /******/ 								error: err2,
                                /******/ 								originalError: err
                                /******/ 							});
                            /******/ 						}
                        /******/ 						if (!options.ignoreErrored) {
                            /******/ 							if (!error) error = err2;
                            /******/ 						}
                        /******/ 						if (!error) error = err;
                        /******/ 					}
                    /******/ 				} else {
                    /******/ 					if (options.onErrored) {
                        /******/ 						options.onErrored({
                            /******/ 							type: "self-accept-errored",
                            /******/ 							moduleId: moduleId,
                            /******/ 							error: err
                            /******/ 						});
                        /******/ 					}
                    /******/ 					if (!options.ignoreErrored) {
                        /******/ 						if (!error) error = err;
                        /******/ 					}
                    /******/ 				}
                /******/ 			}
            /******/ 		}
        /******/
        /******/ 		// handle errors in accept handlers and self accepted module load
        /******/ 		if (error) {
            /******/ 			hotSetStatus("fail");
            /******/ 			return Promise.reject(error);
            /******/ 		}
        /******/
        /******/ 		hotSetStatus("idle");
        /******/ 		return new Promise(function(resolve) {
            /******/ 			resolve(outdatedModules);
            /******/ 		});
        /******/ 	}
    /******/
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
            /******/ 			exports: {},
            /******/ 			hot: hotCreateModule(moduleId),
            /******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
            /******/ 			children: []
            /******/ 		};
        /******/
        /******/ 		// Execute the module function
        /******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
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
            /******/ 			Object.defineProperty(exports, name, {
                /******/ 				configurable: false,
                /******/ 				enumerable: true,
                /******/ 				get: getter
                /******/ 			});
            /******/ 		}
        /******/ 	};
    /******/
    /******/ 	// define __esModule on exports
    /******/ 	__webpack_require__.r = function(exports) {
        /******/ 		Object.defineProperty(exports, '__esModule', { value: true });
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
    /******/ 	__webpack_require__.p = "";
    /******/
    /******/ 	// __webpack_hash__
    /******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
    /******/
    /******/
    /******/ 	// Load entry module and return exports
    /******/ 	return hotCreateRequire(2)(__webpack_require__.s = 2);
    /******/ })
/************************************************************************/
/******/ ({

    /***/ "./ekko-lightbox.js":
    /*!**************************!*\
  !*** ./ekko-lightbox.js ***!
  \**************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {

        "use strict";


        Object.defineProperty(exports, "__esModule", {
            value: true
        });

        var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

        var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

        function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

        var Lightbox = function ($) {

            var NAME = 'ekkoLightbox';
            var JQUERY_NO_CONFLICT = $.fn[NAME];

            var Default = {
                title: '',
                footer: '',
                maxWidth: 9999,
                maxHeight: 9999,
                showArrows: true, //display the left / right arrows or not
                wrapping: true, //if true, gallery loops infinitely
                type: null, //force the lightbox into image / youtube mode. if null, or not image|youtube|vimeo; detect it
                alwaysShowClose: false, //always show the close button, even if there is no title
                loadingMessage: '<div class="ekko-lightbox-loader"><div><div></div><div></div></div></div>', // http://tobiasahlin.com/spinkit/
                leftArrow: '<span>&#10094;</span>',
                rightArrow: '<span>&#10095;</span>',
                strings: {
                    close: 'Close',
                    fail: 'Failed to load image:',
                    type: 'Could not detect remote target type. Force the type using data-type'
                },
                doc: document, // if in an iframe can specify top.document
                onShow: function onShow() {},
                onShown: function onShown() {},
                onHide: function onHide() {},
                onHidden: function onHidden() {},
                onNavigate: function onNavigate() {},
                onContentLoaded: function onContentLoaded() {}
            };

            var Lightbox = function () {
                _createClass(Lightbox, null, [{
                    key: 'Default',


                    /**
                     Class properties:
                     _$element: null -> the <a> element currently being displayed
                     _$modal: The bootstrap modal generated
                     _$modalDialog: The .modal-dialog
                     _$modalContent: The .modal-content
                     _$modalBody: The .modal-body
                     _$modalHeader: The .modal-header
                     _$modalFooter: The .modal-footer
                     _$lightboxContainerOne: Container of the first lightbox element
                     _$lightboxContainerTwo: Container of the second lightbox element
                     _$lightboxBody: First element in the container
                     _$modalArrows: The overlayed arrows container
                     _$galleryItems: Other <a>'s available for this gallery
                     _galleryName: Name of the current data('gallery') showing
                     _galleryIndex: The current index of the _$galleryItems being shown
                     _config: {} the options for the modal
                     _modalId: unique id for the current lightbox
                     _padding / _border: CSS properties for the modal container; these are used to calculate the available space for the content
                     */

                    get: function get() {
                        return Default;
                    }
                }]);

                function Lightbox($element, config) {
                    var _this = this;

                    _classCallCheck(this, Lightbox);

                    this._config = $.extend({}, Default, config);
                    this._$modalArrows = null;
                    this._galleryIndex = 0;
                    this._galleryName = null;
                    this._padding = null;
                    this._border = null;
                    this._titleIsShown = false;
                    this._footerIsShown = false;
                    this._wantedWidth = 0;
                    this._wantedHeight = 0;
                    this._touchstartX = 0;
                    this._touchendX = 0;

                    this._modalId = 'ekkoLightbox-' + Math.floor(Math.random() * 1000 + 1);
                    this._$element = $element instanceof jQuery ? $element : $($element);

                    this._isBootstrap3 = $.fn.modal.Constructor.VERSION[0] == 3;

                    var h4 = '<h4 class="modal-title">' + (this._config.title || "&nbsp;") + '</h4>';
                    var btn = '<button type="button" class="close" data-dismiss="modal" aria-label="' + this._config.strings.close + '"><span aria-hidden="true">&times;</span></button>';

                    var header = '<div class="modal-header' + (this._config.title || this._config.alwaysShowClose ? '' : ' hide') + '">' + (this._isBootstrap3 ? btn + h4 : h4 + btn) + '</div>';
                    var footer = '<div class="modal-footer' + (this._config.footer ? '' : ' hide') + '">' + (this._config.footer || "&nbsp;") + '</div>';
                    var body = '<div class="modal-body"><div class="ekko-lightbox-container"><div class="ekko-lightbox-item fade in show"></div><div class="ekko-lightbox-item fade"></div></div></div>';
                    var dialog = '<div class="modal-dialog" role="document"><div class="modal-content">' + header + body + footer + '</div></div>';
                    $(this._config.doc.body).append('<div id="' + this._modalId + '" class="ekko-lightbox modal fade" tabindex="-1" tabindex="-1" role="dialog" aria-hidden="true">' + dialog + '</div>');

                    this._$modal = $('#' + this._modalId, this._config.doc);
                    this._$modalDialog = this._$modal.find('.modal-dialog').first();
                    this._$modalContent = this._$modal.find('.modal-content').first();
                    this._$modalBody = this._$modal.find('.modal-body').first();
                    this._$modalHeader = this._$modal.find('.modal-header').first();
                    this._$modalFooter = this._$modal.find('.modal-footer').first();

                    this._$lightboxContainer = this._$modalBody.find('.ekko-lightbox-container').first();
                    this._$lightboxBodyOne = this._$lightboxContainer.find('> div:first-child').first();
                    this._$lightboxBodyTwo = this._$lightboxContainer.find('> div:last-child').first();

                    this._border = this._calculateBorders();
                    this._padding = this._calculatePadding();

                    this._galleryName = this._$element.data('gallery');
                    if (this._galleryName) {
                        this._$galleryItems = $(document.body).find('*[data-gallery="' + this._galleryName + '"]');
                        this._galleryIndex = this._$galleryItems.index(this._$element);
                        $(document).on('keydown.ekkoLightbox', this._navigationalBinder.bind(this));

// add the directional arrows to the modal
                        if (this._config.showArrows && this._$galleryItems.length > 1) {
                            this._$lightboxContainer.append('<div class="ekko-lightbox-nav-overlay"><a href="#">' + this._config.leftArrow + '</a><a href="#">' + this._config.rightArrow + '</a></div>');
                            this._$modalArrows = this._$lightboxContainer.find('div.ekko-lightbox-nav-overlay').first();
                            this._$lightboxContainer.on('click', 'a:first-child', function (event) {
                                event.preventDefault();
                                return _this.navigateLeft();
                            });
                            this._$lightboxContainer.on('click', 'a:last-child', function (event) {
                                event.preventDefault();
                                return _this.navigateRight();
                            });
                            this.updateNavigation();
                        }
                    }

                    this._$modal.on('show.bs.modal', this._config.onShow.bind(this)).on('shown.bs.modal', function () {
                        _this._toggleLoading(true);
                        _this._handle();
                        return _this._config.onShown.call(_this);
                    }).on('hide.bs.modal', this._config.onHide.bind(this)).on('hidden.bs.modal', function () {
                        if (_this._galleryName) {
                            $(document).off('keydown.ekkoLightbox');
                            $(window).off('resize.ekkoLightbox');
                        }
                        _this._$modal.remove();
                        return _this._config.onHidden.call(_this);
                    }).modal(this._config);

                    $(window).on('resize.ekkoLightbox', function () {
                        _this._resize(_this._wantedWidth, _this._wantedHeight);
                    });
                    this._$lightboxContainer.on('touchstart', function () {
                        _this._touchstartX = event.changedTouches[0].screenX;
                    }).on('touchend', function () {
                        _this._touchendX = event.changedTouches[0].screenX;
                        _this._swipeGesure();
                    });
                }

                _createClass(Lightbox, [{
                    key: 'element',
                    value: function element() {
                        return this._$element;
                    }
                }, {
                    key: 'modal',
                    value: function modal() {
                        return this._$modal;
                    }
                }, {
                    key: 'navigateTo',
                    value: function navigateTo(index) {

                        if (index < 0 || index > this._$galleryItems.length - 1) return this;

                        this._galleryIndex = index;

                        this.updateNavigation();

                        this._$element = $(this._$galleryItems.get(this._galleryIndex));
                        this._handle();
                    }
                }, {
                    key: 'navigateLeft',
                    value: function navigateLeft() {

                        if (!this._$galleryItems) return;

                        if (this._$galleryItems.length === 1) return;

                        if (this._galleryIndex === 0) {
                            if (this._config.wrapping) this._galleryIndex = this._$galleryItems.length - 1;else return;
                        } else //circular
                            this._galleryIndex--;

                        this._config.onNavigate.call(this, 'left', this._galleryIndex);
                        return this.navigateTo(this._galleryIndex);
                    }
                }, {
                    key: 'navigateRight',
                    value: function navigateRight() {

                        if (!this._$galleryItems) return;

                        if (this._$galleryItems.length === 1) return;

                        if (this._galleryIndex === this._$galleryItems.length - 1) {
                            if (this._config.wrapping) this._galleryIndex = 0;else return;
                        } else //circular
                            this._galleryIndex++;

                        this._config.onNavigate.call(this, 'right', this._galleryIndex);
                        return this.navigateTo(this._galleryIndex);
                    }
                }, {
                    key: 'updateNavigation',
                    value: function updateNavigation() {
                        if (!this._config.wrapping) {
                            var $nav = this._$lightboxContainer.find('div.ekko-lightbox-nav-overlay');
                            if (this._galleryIndex === 0) $nav.find('a:first-child').addClass('disabled');else $nav.find('a:first-child').removeClass('disabled');

                            if (this._galleryIndex === this._$galleryItems.length - 1) $nav.find('a:last-child').addClass('disabled');else $nav.find('a:last-child').removeClass('disabled');
                        }
                    }
                }, {
                    key: 'close',
                    value: function close() {
                        return this._$modal.modal('hide');
                    }

// helper private methods

                }, {
                    key: '_navigationalBinder',
                    value: function _navigationalBinder(event) {
                        event = event || window.event;
                        if (event.keyCode === 39) return this.navigateRight();
                        if (event.keyCode === 37) return this.navigateLeft();
                    }

// type detection private methods

                }, {
                    key: '_detectRemoteType',
                    value: function _detectRemoteType(src, type) {

                        type = type || false;

                        if (!type && this._isImage(src)) type = 'image';
                        if (!type && this._getYoutubeId(src)) type = 'youtube';
                        if (!type && this._getVimeoId(src)) type = 'vimeo';
                        if (!type && this._getInstagramId(src)) type = 'instagram';
                        if (type == 'audio' || type == 'video' || !type && this._isMedia(src)) type = 'media';
                        if (!type || ['image', 'youtube', 'vimeo', 'instagram', 'media', 'url'].indexOf(type) < 0) type = 'url';

                        return type;
                    }
                }, {
                    key: '_getRemoteContentType',
                    value: function _getRemoteContentType(src) {
                        var response = $.ajax({
                            type: 'HEAD',
                            url: src,
                            async: false
                        });
                        var contentType = response.getResponseHeader('Content-Type');
                        return contentType;
                    }
                }, {
                    key: '_isImage',
                    value: function _isImage(string) {
                        return string && string.match(/(^data:image\/.*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg)((\?|#).*)?$)/i);
                    }
                }, {
                    key: '_isMedia',
                    value: function _isMedia(string) {
                        return string && string.match(/(\.(mp3|mp4|ogg|webm|wav)((\?|#).*)?$)/i);
                    }
                }, {
                    key: '_containerToUse',
                    value: function _containerToUse() {
                        var _this2 = this;

// if currently showing an image, fade it out and remove
                        var $toUse = this._$lightboxBodyTwo;
                        var $current = this._$lightboxBodyOne;

                        if (this._$lightboxBodyTwo.hasClass('in')) {
                            $toUse = this._$lightboxBodyOne;
                            $current = this._$lightboxBodyTwo;
                        }

                        $current.removeClass('in show');
                        setTimeout(function () {
                            if (!_this2._$lightboxBodyTwo.hasClass('in')) _this2._$lightboxBodyTwo.empty();
                            if (!_this2._$lightboxBodyOne.hasClass('in')) _this2._$lightboxBodyOne.empty();
                        }, 500);

                        $toUse.addClass('in show');
                        return $toUse;
                    }
                }, {
                    key: '_handle',
                    value: function _handle() {

                        var $toUse = this._containerToUse();
                        this._updateTitleAndFooter();

                        var currentRemote = this._$element.attr('data-remote') || this._$element.attr('href');
                        var currentType = this._detectRemoteType(currentRemote, this._$element.attr('data-type') || false);

                        if (['image', 'youtube', 'vimeo', 'instagram', 'media', 'url'].indexOf(currentType) < 0) return this._error(this._config.strings.type);

                        switch (currentType) {
                            case 'image':
                                this._preloadImage(currentRemote, $toUse);
                                this._preloadImageByIndex(this._galleryIndex, 3);
                                break;
                            case 'youtube':
                                this._showYoutubeVideo(currentRemote, $toUse);
                                break;
                            case 'vimeo':
                                this._showVimeoVideo(this._getVimeoId(currentRemote), $toUse);
                                break;
                            case 'instagram':
                                this._showInstagramVideo(this._getInstagramId(currentRemote), $toUse);
                                break;
                            case 'media':
                                this._showHtml5Media(currentRemote, $toUse);
                                break;
                            default:
                                // url
                                this._loadRemoteContent(currentRemote, $toUse);
                                break;
                        }

                        return this;
                    }
                }, {
                    key: '_getYoutubeId',
                    value: function _getYoutubeId(string) {
                        if (!string) return false;
                        var matches = string.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/);
                        return matches && matches[2].length === 11 ? matches[2] : false;
                    }
                }, {
                    key: '_getVimeoId',
                    value: function _getVimeoId(string) {
                        return string && string.indexOf('vimeo') > 0 ? string : false;
                    }
                }, {
                    key: '_getInstagramId',
                    value: function _getInstagramId(string) {
                        return string && string.indexOf('instagram') > 0 ? string : false;
                    }

// layout private methods

                }, {
                    key: '_toggleLoading',
                    value: function _toggleLoading(show) {
                        show = show || false;
                        if (show) {
                            this._$modalDialog.css('display', 'none');
                            this._$modal.removeClass('in show');
                            $('.modal-backdrop').append(this._config.loadingMessage);
                        } else {
                            this._$modalDialog.css('display', 'block');
                            this._$modal.addClass('in show');
                            $('.modal-backdrop').find('.ekko-lightbox-loader').remove();
                        }
                        return this;
                    }
                }, {
                    key: '_calculateBorders',
                    value: function _calculateBorders() {
                        return {
                            top: this._totalCssByAttribute('border-top-width'),
                            right: this._totalCssByAttribute('border-right-width'),
                            bottom: this._totalCssByAttribute('border-bottom-width'),
                            left: this._totalCssByAttribute('border-left-width')
                        };
                    }
                }, {
                    key: '_calculatePadding',
                    value: function _calculatePadding() {
                        return {
                            top: this._totalCssByAttribute('padding-top'),
                            right: this._totalCssByAttribute('padding-right'),
                            bottom: this._totalCssByAttribute('padding-bottom'),
                            left: this._totalCssByAttribute('padding-left')
                        };
                    }
                }, {
                    key: '_totalCssByAttribute',
                    value: function _totalCssByAttribute(attribute) {
                        return parseInt(this._$modalDialog.css(attribute), 10) + parseInt(this._$modalContent.css(attribute), 10) + parseInt(this._$modalBody.css(attribute), 10);
                    }
                }, {
                    key: '_updateTitleAndFooter',
                    value: function _updateTitleAndFooter() {
                        var title = this._$element.data('title') || "";
                        var caption = this._$element.data('footer') || "";

                        this._titleIsShown = false;
                        if (title || this._config.alwaysShowClose) {
                            this._titleIsShown = true;
                            this._$modalHeader.css('display', '').find('.modal-title').html(title || "&nbsp;");
                        } else this._$modalHeader.css('display', 'none');

                        this._footerIsShown = false;
                        if (caption) {
                            this._footerIsShown = true;
                            this._$modalFooter.css('display', '').html(caption);
                        } else this._$modalFooter.css('display', 'none');

                        return this;
                    }
                }, {
                    key: '_showYoutubeVideo',
                    value: function _showYoutubeVideo(remote, $containerForElement) {
                        var id = this._getYoutubeId(remote);
                        var query = remote.indexOf('&') > 0 ? remote.substr(remote.indexOf('&')) : '';
                        var width = this._$element.data('width') || 560;
                        var height = this._$element.data('height') || width / (560 / 315);
                        return this._showVideoIframe('//www.youtube.com/embed/' + id + '?badge=0&autoplay=1&html5=1' + query, width, height, $containerForElement);
                    }
                }, {
                    key: '_showVimeoVideo',
                    value: function _showVimeoVideo(id, $containerForElement) {
                        var width = this._$element.data('width') || 500;
                        var height = this._$element.data('height') || width / (560 / 315);
                        return this._showVideoIframe(id + '?autoplay=1', width, height, $containerForElement);
                    }
                }, {
                    key: '_showInstagramVideo',
                    value: function _showInstagramVideo(id, $containerForElement) {
// instagram load their content into iframe's so this can be put straight into the element
                        var width = this._$element.data('width') || 612;
                        var height = width + 80;
                        id = id.substr(-1) !== '/' ? id + '/' : id; // ensure id has trailing slash
                        $containerForElement.html('<iframe width="' + width + '" height="' + height + '" src="' + id + 'embed/" frameborder="0" allowfullscreen></iframe>');
                        this._resize(width, height);
                        this._config.onContentLoaded.call(this);
                        if (this._$modalArrows) //hide the arrows when showing video
                            this._$modalArrows.css('display', 'none');
                        this._toggleLoading(false);
                        return this;
                    }
                }, {
                    key: '_showVideoIframe',
                    value: function _showVideoIframe(url, width, height, $containerForElement) {
// should be used for videos only. for remote content use loadRemoteContent (data-type=url)
                        height = height || width; // default to square
                        $containerForElement.html('<div class="embed-responsive embed-responsive-16by9"><iframe width="' + width + '" height="' + height + '" src="' + url + '" frameborder="0" allowfullscreen class="embed-responsive-item"></iframe></div>');
                        this._resize(width, height);
                        this._config.onContentLoaded.call(this);
                        if (this._$modalArrows) this._$modalArrows.css('display', 'none'); //hide the arrows when showing video
                        this._toggleLoading(false);
                        return this;
                    }
                }, {
                    key: '_showHtml5Media',
                    value: function _showHtml5Media(url, $containerForElement) {
// should be used for videos only. for remote content use loadRemoteContent (data-type=url)
                        var contentType = this._getRemoteContentType(url);
                        if (!contentType) {
                            return this._error(this._config.strings.type);
                        }
                        var mediaType = '';
                        if (contentType.indexOf('audio') > 0) {
                            mediaType = 'audio';
                        } else {
                            mediaType = 'video';
                        }
                        var width = this._$element.data('width') || 560;
                        var height = this._$element.data('height') || width / (560 / 315);
                        $containerForElement.html('<div class="embed-responsive embed-responsive-16by9"><' + mediaType + ' width="' + width + '" height="' + height + '" preload="auto" autoplay controls class="embed-responsive-item"><source src="' + url + '" type="' + contentType + '">' + this._config.strings.type + '</' + mediaType + '></div>');
                        this._resize(width, height);
                        this._config.onContentLoaded.call(this);
                        if (this._$modalArrows) this._$modalArrows.css('display', 'none'); //hide the arrows when showing video
                        this._toggleLoading(false);
                        return this;
                    }
                }, {
                    key: '_loadRemoteContent',
                    value: function _loadRemoteContent(url, $containerForElement) {
                        var _this3 = this;

                        var width = this._$element.data('width') || 560;
                        var height = this._$element.data('height') || 560;

                        var disableExternalCheck = this._$element.data('disableExternalCheck') || false;
                        this._toggleLoading(false);

// external urls are loading into an iframe
// local ajax can be loaded into the container itself
                        if (!disableExternalCheck && !this._isExternal(url)) {
                            $containerForElement.load(url, $.proxy(function () {
                                return _this3._$element.trigger('loaded.bs.modal');
                            }));
                        } else {
                            $containerForElement.html('<iframe src="' + url + '" frameborder="0" allowfullscreen></iframe>');
                            this._config.onContentLoaded.call(this);
                        }

                        if (this._$modalArrows) //hide the arrows when remote content
                            this._$modalArrows.css('display', 'none');

                        this._resize(width, height);
                        return this;
                    }
                }, {
                    key: '_isExternal',
                    value: function _isExternal(url) {
                        var match = url.match(/^([^:\/?#]+:)?(?:\/\/([^\/?#]*))?([^?#]+)?(\?[^#]*)?(#.*)?/);
                        if (typeof match[1] === "string" && match[1].length > 0 && match[1].toLowerCase() !== location.protocol) return true;

                        if (typeof match[2] === "string" && match[2].length > 0 && match[2].replace(new RegExp(':(' + {
                            "http:": 80,
                            "https:": 443
                        }[location.protocol] + ')?$'), "") !== location.host) return true;

                        return false;
                    }
                }, {
                    key: '_error',
                    value: function _error(message) {
                        console.error(message);
                        this._containerToUse().html(message);
                        this._resize(300, 300);
                        return this;
                    }
                }, {
                    key: '_preloadImageByIndex',
                    value: function _preloadImageByIndex(startIndex, numberOfTimes) {

                        if (!this._$galleryItems) return;

                        var next = $(this._$galleryItems.get(startIndex), false);
                        if (typeof next == 'undefined') return;

                        var src = next.attr('data-remote') || next.attr('href');
                        if (next.attr('data-type') === 'image' || this._isImage(src)) this._preloadImage(src, false);

                        if (numberOfTimes > 0) return this._preloadImageByIndex(startIndex + 1, numberOfTimes - 1);
                    }
                }, {
                    key: '_preloadImage',
                    value: function _preloadImage(src, $containerForImage) {
                        var _this4 = this;

                        $containerForImage = $containerForImage || false;

                        var img = new Image();
                        if ($containerForImage) {

// if loading takes > 200ms show a loader
                            var loadingTimeout = setTimeout(function () {
                                $containerForImage.append(_this4._config.loadingMessage);
                            }, 200);

                            img.onload = function () {
                                if (loadingTimeout) clearTimeout(loadingTimeout);
                                loadingTimeout = null;
                                var image = $('<img />');
                                image.attr('src', img.src);
                                image.addClass('img-fluid');

// backward compatibility for bootstrap v3
                                image.css('width', '100%');

                                $containerForImage.html(image);
                                if (_this4._$modalArrows) _this4._$modalArrows.css('display', ''); // remove display to default to css property

                                _this4._resize(img.width, img.height);
                                _this4._toggleLoading(false);
                                return _this4._config.onContentLoaded.call(_this4);
                            };
                            img.onerror = function () {
                                _this4._toggleLoading(false);
                                return _this4._error(_this4._config.strings.fail + ('  ' + src));
                            };
                        }

                        img.src = src;
                        return img;
                    }
                }, {
                    key: '_swipeGesure',
                    value: function _swipeGesure() {
                        if (this._touchendX < this._touchstartX) {
                            return this.navigateRight();
                        }
                        if (this._touchendX > this._touchstartX) {
                            return this.navigateLeft();
                        }
                    }
                }, {
                    key: '_resize',
                    value: function _resize(width, height) {

                        height = height || width;
                        this._wantedWidth = width;
                        this._wantedHeight = height;

                        var imageAspecRatio = width / height;

// if width > the available space, scale down the expected width and height
                        var widthBorderAndPadding = this._padding.left + this._padding.right + this._border.left + this._border.right;

// force 10px margin if window size > 575px
                        var addMargin = this._config.doc.body.clientWidth > 575 ? 20 : 0;
                        var discountMargin = this._config.doc.body.clientWidth > 575 ? 0 : 20;

                        var maxWidth = Math.min(width + widthBorderAndPadding, this._config.doc.body.clientWidth - addMargin, this._config.maxWidth);

                        if (width + widthBorderAndPadding > maxWidth) {
                            height = (maxWidth - widthBorderAndPadding - discountMargin) / imageAspecRatio;
                            width = maxWidth;
                        } else width = width + widthBorderAndPadding;

                        var headerHeight = 0,
                            footerHeight = 0;

// as the resize is performed the modal is show, the calculate might fail
// if so, default to the default sizes
                        if (this._footerIsShown) footerHeight = this._$modalFooter.outerHeight(true) || 55;

                        if (this._titleIsShown) headerHeight = this._$modalHeader.outerHeight(true) || 67;

                        var borderPadding = this._padding.top + this._padding.bottom + this._border.bottom + this._border.top;

//calculated each time as resizing the window can cause them to change due to Bootstraps fluid margins
                        var margins = parseFloat(this._$modalDialog.css('margin-top')) + parseFloat(this._$modalDialog.css('margin-bottom'));

                        var maxHeight = Math.min(height, $(window).height() - borderPadding - margins - headerHeight - footerHeight, this._config.maxHeight - borderPadding - headerHeight - footerHeight);

                        if (height > maxHeight) {
// if height > the available height, scale down the width
                            width = Math.ceil(maxHeight * imageAspecRatio) + widthBorderAndPadding;
                        }

                        this._$lightboxContainer.css('height', maxHeight);
                        this._$modalDialog.css('flex', 1).css('maxWidth', width);

                        var modal = this._$modal.data('bs.modal');
                        if (modal) {
// v4 method is mistakenly protected
                            try {
                                modal._handleUpdate();
                            } catch (Exception) {
                                modal.handleUpdate();
                            }
                        }
                        return this;
                    }
                }], [{
                    key: '_jQueryInterface',
                    value: function _jQueryInterface(config) {
                        var _this5 = this;

                        config = config || {};
                        return this.each(function () {
                            var $this = $(_this5);
                            var _config = $.extend({}, Lightbox.Default, $this.data(), (typeof config === 'undefined' ? 'undefined' : _typeof(config)) === 'object' && config);

                            new Lightbox(_this5, _config);
                        });
                    }
                }]);

                return Lightbox;
            }();

            $.fn[NAME] = Lightbox._jQueryInterface;
            $.fn[NAME].Constructor = Lightbox;
            $.fn[NAME].noConflict = function () {
                $.fn[NAME] = JQUERY_NO_CONFLICT;
                return Lightbox._jQueryInterface;
            };

            return Lightbox;
        }(jQuery);

        exports.default = Lightbox;

        /***/ }),

    /***/ "./ekko-lightbox.less":
    /*!****************************!*\
  !*** ./ekko-lightbox.less ***!
  \****************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
        if(true) {
// 1559064923616
            var cssReload = __webpack_require__(/*! ./node_modules/css-hot-loader/hotModuleReplacement.js */ "./node_modules/css-hot-loader/hotModuleReplacement.js")(module.i, {"fileMap":"{fileName}"});
            module.hot.dispose(cssReload);
            module.hot.accept(undefined, cssReload);
        }


        /***/ }),

    /***/ "./index.html":
    /*!********************!*\
  !*** ./index.html ***!
  \********************/
    /*! no static exports found */
    /***/ (function(module, exports) {

        module.exports = "<!DOCTYPE html>\n<html>\n    <head>\n        <title>Bootstrap Lightbox</title>\n\n        <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n\n        <link rel=\"stylesheet\" href=\"https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/css/bootstrap.min.css\" integrity=\"sha384-/Y6pD6FV/Vv2HJnA6t+vslU6fwYXjCFtcEpHbNJ0lyAFsXTsjBbfaDjzALeQsN6M\" crossorigin=\"anonymous\">\n        <link href=\"main.css\" rel=\"stylesheet\">\n\n        <!-- for documentation only -->\n        <style type=\"text/css\">\n            div.row > div > div.row {\n                margin-bottom: 15px;\n            }\n\n            html {\n                background-color: #02709e;\n            }\n            body {\n                background: #fefefe;\n                padding-bottom: 50px;\n            }\n\n            div.top-container {\n                padding-top:100px;\n              /*  background-color: #02709e; */\n                background-image: url(\"images/header.jpg\");\n                background-size: cover;\n                color:#ccc;\n            }\n            div.top-container h1 {\n                color:white;\n            }\n            div.top-container a {\n                color:#ccc;\n                border-bottom:1px dotted white;\n            }\n            div.top-container a:hover {\n                color: white;\n                cursor:pointer;\n                border-bottom:1px solid white;\n                text-decoration: none;\n            }\n            div.top-header {\n                margin-bottom:100px;\n            }\n\n            h2 {\n                background-color:#02709e;\n                color:white;\n                display:inline-block;\n                padding:6px;\n                margin-top:100px;\n            }\n\n            h3 {\n                padding-bottom:5px;\n                margin-bottom:10px;\n                border-bottom:1px solid #f2f2f2;\n                margin-top: 50px;\n            }\n\n            h4:not(.modal-title) {\n                margin-top:25px;\n            }\n\n            figure {\n                position: relative;\n            }\n\n            figure figcaption {\n                font-size: 22px;\n                color: #fff;\n                text-decoration: none;\n                bottom: 10px;\n                right: 20px;\n                position: absolute;\n                background-color: #000;\n            }\n\t\t\tcode[data-code], code.block-code {\n                display:block;\n                overflow:scroll;\n                font-size:12px;\n\t\t\t\twhite-space: pre;\n\t\t\t}\n\n            table {\n                font-size:12px;\n            }\n            .footer {\n                text-align: center;\n            }\n            .footer span {\n                margin-top:100px;\n                font-size:12px;\n                background-color:#02709e;\n                color:white;\n                display:inline-block;\n                padding:6px;\n            }\n            .footer span a {\n                color:#ccc;\n                border-bottom:1px dotted white;\n            }\n            .footer span a:hover {\n                cursor:pointer;\n                color: white;\n                border-bottom:1px solid white;\n                text-decoration: none;\n            }\n            a.anchorjs-link {\n                color:black;\n            }\n            a.anchorjs-link:hover {\n                color:#02709e;\n                text-decoration: none;\n            }\n\n\n            .image-container {\n                position: relative;\n                width: 200px;\n                text-align: center;\n            }\n            .image-container .after {\n                position: absolute;\n                top: 0;\n                left: 0;\n                width: 100%;\n                height: 100%;\n                display: none;\n                color: #FFF;\n            }\n            html {\n                scroll-behavior: smooth;\n            }\n\n        </style>\n    </head>\n    <body>\n\n        <div class=\"top-container\">\n\n            <div class=\"container\">\n                <div class=\"row justify-content-center\">\n                    <div class=\"col-md-10\">\n\n                        <div class=\"top-header\">\n                            <h1>El Cauca Emerge</h1>\n                            <p class=\"lead\"> Para contribuir al desarrollo... Clona nuestro repo en <a href=\"https://github.com/ashleydw/lightbox\">GitHub</a></p>\n                            <div class=\"text-center\">\n                                <iframe src=\"http://ghbtns.com/github-btn.html?user=jflatorreo&repo=ElCaucaEmerge&type=watch&count=true\" allowtransparency=\"true\" frameborder=\"0\" scrolling=\"0\" width=\"100\t\" height=\"20\"></iframe>\n                                <iframe src=\"http://ghbtns.com/github-btn.html?user=jflatorreo&repo=ElCaucaEmerge&type=fork&count=true\" allowtransparency=\"true\" frameborder=\"0\" scrolling=\"0\" width=\"100\" height=\"20\"></iframe>\n                                <iframe src=\"http://ghbtns.com/github-btn.html?user=jflatorreo&repo=ElCaucaEmerge&type=follow&count=true\" allowtransparency=\"true\" frameborder=\"0\" scrolling=\"0\" width=\"160\" height=\"20\"></iframe>\n                            </div>\n                        </div>\n\n                    </div>\n                </div>\n            </div>\n        </div>\n\n        <div class=\"container\">\n            <div class=\"row justify-content-center\">\n                <div class=\"col-md-10\">\n\n                    <h3 id=\"programatically-call\">Un llamado de Emergencia</h3>\n                    <p>Elaboramos una ruta que nos condujo a contar con cada vez mas voces</p>\n\n\n\n                    <div>\n                        <div class=\"row justify-content-center\">\n                            <div class=\"col-md-8\">\n                                <div class=\"row\">\n                                    <div class=\"image-container\">\n                                        <a href=\"images/full/minga.jpg\" data-toggle=\"lightbox\" data-gallery=\"example-gallery\" class=\"col-sm-4\">\n                                            <img src=\"images/thumbs/minga.jpg\" class=\"img-fluid\">\n                                            <span class=\"after\"><a href=\"#Minga\">Sembrando la semilla</a></span>\n                                        </a>\n                                    </div>\n\n                                    <div class=\"image-container\">\n                                    <a href=\"images/full/ruta.jpg\" data-toggle=\"lightbox\" data-gallery=\"example-gallery\" class=\"col-sm-4\">\n                                        <img src=\"images/thumbs/ruta.jpg\" class=\"img-fluid\">\n                                        <span class=\"after\"><a href=\"#\">La ruta al Foro</a></span>\n                                    </a>\n                                    </div>\n\n                                    <div class=\"image-container\">\n                                    <a href=\"images/full/taller_1.jpg\" data-toggle=\"lightbox\" data-gallery=\"example-gallery\" class=\"col-sm-4\">\n                                        <img src=\"images/thumbs/taller_1.jpg\" class=\"img-fluid\">\n                                        <span class=\"after\"><a href=\"#PrimerTaller\">Memorias del primer taller</a></span>\n                                    </a>\n                                    </div>\n                                    <div class=\"image-container\">\n                                    <a href=\"images/full/taller_2.jpg\" data-toggle=\"lightbox\" data-gallery=\"example-gallery\" class=\"col-sm-4\">\n                                        <img src=\"images/thumbs/taller_2.jpg\" class=\"img-fluid\">\n                                        <span class=\"after\"><a href=\"#SegundoTaller\">Memorias del segundo taller</a></span>\n                                    </a>\n                                    </div>\n                                    <div class=\"image-container\">\n                                    <a href=\"images/full/flyer_foro.jpg\" data-toggle=\"lightbox\" data-gallery=\"example-gallery\" class=\"col-sm-4\">\n                                        <img src=\"images/thumbs/flyer_foro.jpg\" class=\"img-fluid\">\n                                    </a>\n                                    </div>\n                                    <div class=\"image-container\" style=\"margin-left: 5%\">\n                                    <a href=\"images/full/programacion_foro.jpg\" data-toggle=\"lightbox\" data-gallery=\"example-gallery\" class=\"col-sm-4\">\n                                        <img src=\"images/thumbs/programacion_foro.jpg\" class=\"img-fluid\">\n                                        <span class=\"after\"><a href=\"/client\">Memorias del Foro</a></span>\n                                    </a>\n                    </div>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n\n\n                    <h3 id=\"Minga\">El Color Emerge en la Minga Nacional</h3>\n                    <p>Para frenar la violencia, nos expresamos con vida, alegría y color desde Párraga hasta la Paz, tres semillas iniciaron a germinar.</p>\n\n                    <div>\n                        <div class=\"row justify-content-center\">\n                            <div class=\"col-md-8\">\n                                <div class=\"row\">\n                                    <div class=\"image-container\">\n                                        <a href=\"images/full/ruta_pacifica.jpg\" data-toggle=\"lightbox\" data-gallery=\"example-gallery\" class=\"col-sm-4\">\n                                            <img src=\"images/thumbs/ruta_pacifica.jpg\" class=\"img-fluid\">\n                                        </a>\n                                    </div>\n                                    <div class=\"image-container\">\n                                        <a href=\"images/full/mural_fup.jpg\" data-toggle=\"lightbox\" data-gallery=\"example-gallery\" class=\"col-sm-4\">\n                                            <img src=\"images/thumbs/mural_fup.jpg\" class=\"img-fluid\">\n                                        </a>\n                                    </div>\n                                    <div class=\"image-container\">\n                                        <a href=\"images/full/mural_fup2.jpg\" data-toggle=\"lightbox\" data-gallery=\"example-gallery\" class=\"col-sm-4\">\n                                            <img src=\"images/thumbs/mural_fup2.jpg\" class=\"img-fluid\">\n                                        </a>\n                                    </div>\n                                    <div class=\"image-container\">\n                                        <a href=\"images/full/mural_fup3.jpg\" data-toggle=\"lightbox\" data-gallery=\"example-gallery\" class=\"col-sm-4\">\n                                            <img src=\"images/thumbs/mural_fup3.jpg\" class=\"img-fluid\">\n                                        </a>\n                                </div>\n                                    <div class=\"image-container\">\n                                        <a href=\"images/full/marcha.jpg\" data-toggle=\"lightbox\" data-gallery=\"example-gallery\" class=\"col-sm-4\">\n                                            <img src=\"images/thumbs/marcha.jpg\" class=\"img-fluid\">\n                                        </a>\n                                    </div>\n                            </div>\n                        </div>\n                    </div>\n                    </div>\n\n\n                    <h3 id=\"PrimerTaller\">Primer Taller</h3>\n                    <p>...Nos encontramos el día 11 de Mayo en nuestra primera conversa...</p>\n\n                    <div>\n                        <div class=\"row justify-content-center\">\n                            <div class=\"col-md-8\">\n                                <div class=\"row\">\n                                    <div class=\"image-container\">\n                                        <a href=\"images/full/1taller1.jpg\" data-toggle=\"lightbox\" data-gallery=\"example-gallery\" class=\"col-sm-4\">\n                                            <img src=\"images/thumbs/1taller1.jpg\" class=\"img-fluid\">\n                                        </a>\n                                    </div>\n                                    <div class=\"image-container\">\n                                        <a href=\"images/full/1taller2.jpg\" data-toggle=\"lightbox\" data-gallery=\"example-gallery\" class=\"col-sm-4\">\n                                            <img src=\"images/thumbs/1taller2.jpg\" class=\"img-fluid\">\n                                        </a>\n                                    </div>\n                                    <div class=\"image-container\">\n                                        <a href=\"images/full/1taller3.jpg\" data-toggle=\"lightbox\" data-gallery=\"example-gallery\" class=\"col-sm-4\">\n                                            <img src=\"images/thumbs/1taller3.jpg\" class=\"img-fluid\">\n                                        </a>\n                                    </div>\n                                    <div class=\"image-container\">\n                                        <a href=\"images/full/1taller4.jpg\" data-toggle=\"lightbox\" data-gallery=\"example-gallery\" class=\"col-sm-4\">\n                                            <img src=\"images/thumbs/1taller4.jpg\" class=\"img-fluid\">\n                                        </a>\n                                    </div>\n                                    <div class=\"image-container\">\n                                        <a href=\"images/full/1taller5.jpg\" data-toggle=\"lightbox\" data-gallery=\"example-gallery\" class=\"col-sm-4\">\n                                            <img src=\"images/thumbs/1taller5.jpg\" class=\"img-fluid\">\n                                        </a>\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n\n                        <h3 id=\"SegundoTaller\">Segundo Taller</h3>\n                        <p>...Y luego vivenciamos en el Territorio Campesino Agroalimentario de Cajibio algo de su realidad rural el 18 de Mayo.</p>\n\n                    <div>\n                        <div class=\"row justify-content-center\">\n                            <div class=\"col-md-8\">\n                                <div class=\"row\">\n                                    <div class=\"image-container\">\n                                        <a href=\"images/full/2taller1.jpg\" data-toggle=\"lightbox\" data-gallery=\"example-gallery\" class=\"col-sm-4\">\n                                            <img src=\"images/thumbs/2taller1.jpg\" class=\"img-fluid\">\n                                        </a>\n                                    </div>\n                                    <div class=\"image-container\">\n                                        <a href=\"images/full/2taller2.jpg\" data-toggle=\"lightbox\" data-gallery=\"example-gallery\" class=\"col-sm-4\">\n                                            <img src=\"images/thumbs/2taller2.jpg\" class=\"img-fluid\">\n                                        </a>\n                                    </div>\n                                    <div class=\"image-container\">\n                                        <a href=\"images/full/2taller3.jpg\" data-toggle=\"lightbox\" data-gallery=\"example-gallery\" class=\"col-sm-4\">\n                                            <img src=\"images/thumbs/2taller3.jpg\" class=\"img-fluid\">\n                                        </a>\n                                    </div>\n                                    <div class=\"image-container\">\n                                        <a href=\"images/full/2taller4.jpg\" data-toggle=\"lightbox\" data-gallery=\"example-gallery\" class=\"col-sm-4\">\n                                            <img src=\"images/thumbs/2taller4.jpg\" class=\"img-fluid\">\n                                        </a>\n                                    </div>\n                                    <div class=\"image-container\">\n                                        <a href=\"images/full/2taller5.jpg\" data-toggle=\"lightbox\" data-gallery=\"example-gallery\" class=\"col-sm-4\">\n                                            <img src=\"images/thumbs/2taller5.jpg\" class=\"img-fluid\">\n                                        </a>\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n\n                        <h3 id=\"Foro\">20 de Mayo, Foro \"El Cauca Emerge\"</h3>\n                        <p>Finalmente, relizamos nuestro primer Foro \"El Cauca Emerge: Actualidad territorial, problematicas, reflexiones y posturas de artistas, comunidades rurales e intelectuales\"</p>\n\n                        <div class=\"row justify-content-center\">\n                            <div class=\"col-md-10\">\n                                <div class=\"row\">\n                                    <div class=\"image-container\">\n                                        <a href=\"images/full/Foro1.jpg\" data-toggle=\"lightbox\" data-gallery=\"example-gallery\" class=\"col-sm-4\">\n                                            <img src=\"images/thumbs/Foro1.jpg\" class=\"img-fluid\">\n                                        </a>\n                                    </div>\n                                    <div class=\"image-container\">\n                                        <a href=\"images/full/Foro2.jpg\" data-toggle=\"lightbox\" data-gallery=\"example-gallery\" class=\"col-sm-4\">\n                                            <img src=\"images/thumbs/Foro2.jpg\" class=\"img-fluid\">\n                                        </a>\n                                    </div>\n                                    <div class=\"image-container\">\n                                        <a href=\"images/full/Foro3.jpg\" data-toggle=\"lightbox\" data-gallery=\"example-gallery\" class=\"col-sm-4\">\n                                            <img src=\"images/thumbs/Foro3.jpg\" class=\"img-fluid\">\n                                        </a>\n                                    </div>\n                                    <div class=\"image-container\">\n                                        <a href=\"images/full/Foro4.jpg\" data-toggle=\"lightbox\" data-gallery=\"example-gallery\" class=\"col-sm-4\">\n                                            <img src=\"images/thumbs/Foro4.jpg\" class=\"img-fluid\">\n                                        </a>\n                                    </div>\n                                    <div class=\"image-container\">\n                                        <a href=\"images/full/Foro5.jpg\" data-toggle=\"lightbox\" data-gallery=\"example-gallery\" class=\"col-sm-4\">\n                                            <img src=\"images/thumbs/Foro5.jpg\" class=\"img-fluid\">\n                                        </a>\n                                    </div>\n                                    <div class=\"image-container\">\n                                        <a href=\"images/full/Foro6.jpg\" data-toggle=\"lightbox\" data-gallery=\"example-gallery\" class=\"col-sm-4\">\n                                            <img src=\"images/thumbs/Foro6.jpg\" class=\"img-fluid\">\n                                        </a>\n                                    </div>\n                                    <div class=\"image-container\">\n                                        <a href=\"images/full/Foro7.jpg\" data-toggle=\"lightbox\" data-gallery=\"example-gallery\" class=\"col-sm-4\">\n                                            <img src=\"images/thumbs/Foro7.jpg\" class=\"img-fluid\">\n                                        </a>\n                                    </div>\n                                    <div class=\"image-container\">\n                                        <a href=\"images/full/Foro8.jpg\" data-toggle=\"lightbox\" data-gallery=\"example-gallery\" class=\"col-sm-4\">\n                                            <img src=\"images/thumbs/Foro9.jpg\" class=\"img-fluid\">\n                                        </a>\n                                    </div>\n                                    <div class=\"image-container\">\n                                        <a href=\"images/full/Foro10.jpg\" data-toggle=\"lightbox\" data-gallery=\"example-gallery\" class=\"col-sm-4\">\n                                            <img src=\"images/thumbs/Foro10.jpg\" class=\"img-fluid\">\n                                        </a>\n                                    </div>\n                                    <div class=\"image-container\">\n                                        <a href=\"images/full/Foro1.jpg\" data-toggle=\"lightbox\" data-gallery=\"example-gallery\" class=\"col-sm-4\">\n                                            <img src=\"images/thumbs/Foro1.jpg\" class=\"img-fluid\">\n                                        </a>\n                                    </div>\n                                    <div class=\"image-container\">\n                                        <a href=\"https://youtu.be/6xpJt5OyWMg\" id=\"open-youtube\" data-gallery=\"example-gallery\" class=\"col-sm-4\">\n                                            <img src=\"http://i1.ytimg.com/vi/6xpJt5OyWMg/mqdefault.jpg\" class=\"img-fluid\">\n                                        </a>\n                                    </div>\n                                    <div class=\"image-container\">\n                                        <a href=\"https://youtu.be/QPRfjeYc3CM\" id=\"open-youtube\" data-gallery=\"example-gallery\" class=\"col-sm-4\">\n                                            <img src=\"http://i1.ytimg.com/vi/QPRfjeYc3CM/mqdefault.jpg\" class=\"img-fluid\">\n                                        </a>\n                                    </div>\n                                    <a href=\"/client\" class=\"col-6\">\n                                        <img src=\"images/thumbs/programacion_foro_memorias.jpg\" class=\"img-fluid\">\n                                    </a>\n                                </div>\n                            </div>\n                        </div>\n\n                    <p class=\"footer\"><span>#ElCaucaEmerge</span></p>\n                </div>\n            </div>\n        </div>\n\n        <script src=\"https://code.jquery.com/jquery-3.2.1.slim.min.js\" integrity=\"sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN\" crossorigin=\"anonymous\"></script>\n        <script src=\"https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.11.0/umd/popper.min.js\" integrity=\"sha384-b/U6ypiBEHpOf/4+1nzFpr53nxSS+GLCkfwBdFNTxtclqqenISfwAzpKaMNFNmj4\" crossorigin=\"anonymous\"></script>\n        <script src=\"https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/js/bootstrap.min.js\" integrity=\"sha384-h0AbiXch4ZDo7tp9hKZ4TsHbi047NrKGLO3SEJAg45jXxnGIfYzk4Si90RDIqNm1\" crossorigin=\"anonymous\"></script>\n        <script src=\"main.js\"></script>\n\n        <!-- for documentation only -->\n        <script src=\"https://cdnjs.cloudflare.com/ajax/libs/anchor-js/3.2.1/anchor.min.js\"></script>\n        <script type=\"text/javascript\">\n            $(document).ready(function ($) {\n                // delegate calls to data-toggle=\"lightbox\"\n                $(document).on('click', '[data-toggle=\"lightbox\"]:not([data-gallery=\"navigateTo\"]):not([data-gallery=\"example-gallery-11\"])', function(event) {\n                    event.preventDefault();\n                    return $(this).ekkoLightbox({\n                        onShown: function() {\n                            if (window.console) {\n                                return console.log('Checking our the events huh?');\n                            }\n                        },\n\t\t\t\t\t\tonNavigate: function(direction, itemIndex) {\n                            if (window.console) {\n                                return console.log('Navigating '+direction+'. Current item: '+itemIndex);\n                            }\n\t\t\t\t\t\t}\n                    });\n                });\n\n                // disable wrapping\n                $(document).on('click', '[data-toggle=\"lightbox\"][data-gallery=\"example-gallery-11\"]', function(event) {\n                    event.preventDefault();\n                    return $(this).ekkoLightbox({\n                        wrapping: false\n                    });\n                });\n\n                //Programmatically call\n                $('#open-image').click(function (e) {\n                    e.preventDefault();\n                    $(this).ekkoLightbox();\n                });\n                $('#open-youtube').click(function (e) {\n                    e.preventDefault();\n                    $(this).ekkoLightbox();\n                });\n                $('#open-link').click(function (e) {\n                   // e.preventDefault();\n                  //  $window.open('_link is here_', 'name');\n                });\n\n\t\t\t\t// navigateTo\n                $(document).on('click', '[data-toggle=\"lightbox\"][data-gallery=\"navigateTo\"]', function(event) {\n                    event.preventDefault();\n\n                    return $(this).ekkoLightbox({\n                        onShown: function() {\n\n\t\t\t\t\t\t\tthis.modal().on('click', '.modal-footer a', function(e) {\n\n\t\t\t\t\t\t\t\te.preventDefault();\n\t\t\t\t\t\t\t\tthis.navigateTo(2);\n\n                            }.bind(this));\n\n                        }\n                    });\n                });\n\n\n                /**\n                 * Documentation specific - ignore this\n                 */\n                anchors.options.placement = 'left';\n                anchors.add('h3');\n                $('code[data-code]').each(function() {\n\n                    var $code = $(this),\n                        $pair = $('div[data-code=\"'+$code.data('code')+'\"]');\n\n                    $code.hide();\n                    var text = $code.text($pair.html()).html().trim().split(\"\\n\");\n                    var indentLength = text[text.length - 1].match(/^\\s+/)\n                    indentLength = indentLength ? indentLength[0].length : 24;\n                    var indent = '';\n                    for(var i = 0; i < indentLength; i++)\n                        indent += ' ';\n                    if($code.data('trim') == 'all') {\n                        for (var i = 0; i < text.length; i++)\n                            text[i] = text[i].trim();\n                    } else  {\n                        for (var i = 0; i < text.length; i++)\n                            text[i] = text[i].replace(indent, '    ').replace('    ', '');\n                    }\n                    text = text.join(\"\\n\");\n                    $code.html(text).show();\n\n                });\n            });\n        </script>\n    </body>\n</html>\n"

        /***/ }),

    /***/ "./node_modules/css-hot-loader/hotModuleReplacement.js":
    /*!*************************************************************!*\
  !*** ./node_modules/css-hot-loader/hotModuleReplacement.js ***!
  \*************************************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {

        var normalizeUrl = __webpack_require__(/*! normalize-url */ "./node_modules/normalize-url/index.js");
        var srcByModuleId = Object.create(null);
        var debounce = __webpack_require__(/*! lodash/debounce */ "./node_modules/lodash/debounce.js");

        var noDocument = typeof document === 'undefined';
        var forEach = Array.prototype.forEach;

        var noop = function () {};

        var getCurrentScriptUrl = function(moduleId) {
            var src = srcByModuleId[moduleId];

            if (!src) {
                if (document.currentScript) {
                    src = document.currentScript.src;
                } else {
                    var scripts = document.getElementsByTagName('script');
                    var lastScriptTag = scripts[scripts.length - 1];

                    if (lastScriptTag) {
                        src = lastScriptTag.src;
                    }
                }
                srcByModuleId[moduleId] = src;
            }

            return function(fileMap) {
                var splitResult = /([^\\/]+)\.js$/.exec(src);
                var filename = splitResult && splitResult[1];
                if (!filename) {
                    return [src.replace('.js', '.css')];
                }
                return fileMap.split(',').map(function(mapRule) {
                    var reg = new RegExp(filename + '\\.js$', 'g')
                    return normalizeUrl(src.replace(reg, mapRule.replace(/{fileName}/g, filename) + '.css'), { stripWWW: false });
                });
            };
        };

        function updateCss(el, url) {
            if (!url) {
                url = el.href.split('?')[0];
            }
            if (el.isLoaded === false) {
// We seem to be about to replace a css link that hasn't loaded yet.
// We're probably changing the same file more than once.
                return;
            }
            if (!url || !(url.indexOf('.css') > -1)) return;

            el.visited = true;
            var newEl = el.cloneNode();

            newEl.isLoaded = false;
            newEl.addEventListener('load', function () {
                newEl.isLoaded = true;
                el.remove();
            });
            newEl.addEventListener('error', function () {
                newEl.isLoaded = true;
                el.remove();
            });

            newEl.href = url + '?' + Date.now();
            el.parentNode.appendChild(newEl);
        }

        function reloadStyle(src) {
            var elements = document.querySelectorAll('link');
            var loaded = false;

            forEach.call(elements, function(el) {
                if (el.visited === true) return;

                var url = getReloadUrl(el.href, src);
                if (url) {
                    updateCss(el, url);
                    loaded = true;
                }
            });

            return loaded;
        }

        function getReloadUrl(href, src) {
            href = normalizeUrl(href, { stripWWW: false });
            var ret;
            src.some(function(url) {
                if (href.indexOf(src) > -1) {
                    ret = url;
                }
            });
            return ret;
        }

        function reloadAll() {
            var elements = document.querySelectorAll('link');
            forEach.call(elements, function(el) {
                if (el.visited === true) return;
                updateCss(el);
            });
        }

        module.exports = function(moduleId, options) {
            var getScriptSrc;

            if (noDocument) {
                return noop;
            }

            getScriptSrc = getCurrentScriptUrl(moduleId);

            function update() {
                var src = getScriptSrc(options.fileMap);
                var reloaded = reloadStyle(src);
                if (reloaded) {
                    console.log('[HMR] css reload %s', src.join(' '));
                } else {
                    console.log('[HMR] Reload all css');
                    reloadAll();
                }
            }

            return debounce(update, 10);
        };


        /***/ }),

    /***/ "./node_modules/is-plain-obj/index.js":
    /*!********************************************!*\
  !*** ./node_modules/is-plain-obj/index.js ***!
  \********************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {

        "use strict";

        var toString = Object.prototype.toString;

        module.exports = function (x) {
            var prototype;
            return toString.call(x) === '[object Object]' && (prototype = Object.getPrototypeOf(x), prototype === null || prototype === Object.getPrototypeOf({}));
        };


        /***/ }),

    /***/ "./node_modules/lodash/_Symbol.js":
    /*!****************************************!*\
  !*** ./node_modules/lodash/_Symbol.js ***!
  \****************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {

        var root = __webpack_require__(/*! ./_root */ "./node_modules/lodash/_root.js");

        /** Built-in value references. */
        var Symbol = root.Symbol;

        module.exports = Symbol;


        /***/ }),

    /***/ "./node_modules/lodash/_baseGetTag.js":
    /*!********************************************!*\
  !*** ./node_modules/lodash/_baseGetTag.js ***!
  \********************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {

        var Symbol = __webpack_require__(/*! ./_Symbol */ "./node_modules/lodash/_Symbol.js"),
            getRawTag = __webpack_require__(/*! ./_getRawTag */ "./node_modules/lodash/_getRawTag.js"),
            objectToString = __webpack_require__(/*! ./_objectToString */ "./node_modules/lodash/_objectToString.js");

        /** `Object#toString` result references. */
        var nullTag = '[object Null]',
            undefinedTag = '[object Undefined]';

        /** Built-in value references. */
        var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

        /**
         * The base implementation of `getTag` without fallbacks for buggy environments.
         *
         * @private
         * @param {*} value The value to query.
         * @returns {string} Returns the `toStringTag`.
         */
        function baseGetTag(value) {
            if (value == null) {
                return value === undefined ? undefinedTag : nullTag;
            }
            return (symToStringTag && symToStringTag in Object(value))
                ? getRawTag(value)
                : objectToString(value);
        }

        module.exports = baseGetTag;


        /***/ }),

    /***/ "./node_modules/lodash/_freeGlobal.js":
    /*!********************************************!*\
  !*** ./node_modules/lodash/_freeGlobal.js ***!
  \********************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {

        /* WEBPACK VAR INJECTION */(function(global) {/** Detect free variable `global` from Node.js. */
        var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

            module.exports = freeGlobal;

            /* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

        /***/ }),

    /***/ "./node_modules/lodash/_getRawTag.js":
    /*!*******************************************!*\
  !*** ./node_modules/lodash/_getRawTag.js ***!
  \*******************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {

        var Symbol = __webpack_require__(/*! ./_Symbol */ "./node_modules/lodash/_Symbol.js");

        /** Used for built-in method references. */
        var objectProto = Object.prototype;

        /** Used to check objects for own properties. */
        var hasOwnProperty = objectProto.hasOwnProperty;

        /**
         * Used to resolve the
         * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
         * of values.
         */
        var nativeObjectToString = objectProto.toString;

        /** Built-in value references. */
        var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

        /**
         * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
         *
         * @private
         * @param {*} value The value to query.
         * @returns {string} Returns the raw `toStringTag`.
         */
        function getRawTag(value) {
            var isOwn = hasOwnProperty.call(value, symToStringTag),
                tag = value[symToStringTag];

            try {
                value[symToStringTag] = undefined;
                var unmasked = true;
            } catch (e) {}

            var result = nativeObjectToString.call(value);
            if (unmasked) {
                if (isOwn) {
                    value[symToStringTag] = tag;
                } else {
                    delete value[symToStringTag];
                }
            }
            return result;
        }

        module.exports = getRawTag;


        /***/ }),

    /***/ "./node_modules/lodash/_objectToString.js":
    /*!************************************************!*\
  !*** ./node_modules/lodash/_objectToString.js ***!
  \************************************************/
    /*! no static exports found */
    /***/ (function(module, exports) {

        /** Used for built-in method references. */
        var objectProto = Object.prototype;

        /**
         * Used to resolve the
         * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
         * of values.
         */
        var nativeObjectToString = objectProto.toString;

        /**
         * Converts `value` to a string using `Object.prototype.toString`.
         *
         * @private
         * @param {*} value The value to convert.
         * @returns {string} Returns the converted string.
         */
        function objectToString(value) {
            return nativeObjectToString.call(value);
        }

        module.exports = objectToString;


        /***/ }),

    /***/ "./node_modules/lodash/_root.js":
    /*!**************************************!*\
  !*** ./node_modules/lodash/_root.js ***!
  \**************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {

        var freeGlobal = __webpack_require__(/*! ./_freeGlobal */ "./node_modules/lodash/_freeGlobal.js");

        /** Detect free variable `self`. */
        var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

        /** Used as a reference to the global object. */
        var root = freeGlobal || freeSelf || Function('return this')();

        module.exports = root;


        /***/ }),

    /***/ "./node_modules/lodash/debounce.js":
    /*!*****************************************!*\
  !*** ./node_modules/lodash/debounce.js ***!
  \*****************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {

        var isObject = __webpack_require__(/*! ./isObject */ "./node_modules/lodash/isObject.js"),
            now = __webpack_require__(/*! ./now */ "./node_modules/lodash/now.js"),
            toNumber = __webpack_require__(/*! ./toNumber */ "./node_modules/lodash/toNumber.js");

        /** Error message constants. */
        var FUNC_ERROR_TEXT = 'Expected a function';

        /* Built-in method references for those with the same name as other `lodash` methods. */
        var nativeMax = Math.max,
            nativeMin = Math.min;

        /**
         * Creates a debounced function that delays invoking `func` until after `wait`
         * milliseconds have elapsed since the last time the debounced function was
         * invoked. The debounced function comes with a `cancel` method to cancel
         * delayed `func` invocations and a `flush` method to immediately invoke them.
         * Provide `options` to indicate whether `func` should be invoked on the
         * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
         * with the last arguments provided to the debounced function. Subsequent
         * calls to the debounced function return the result of the last `func`
         * invocation.
         *
         * **Note:** If `leading` and `trailing` options are `true`, `func` is
         * invoked on the trailing edge of the timeout only if the debounced function
         * is invoked more than once during the `wait` timeout.
         *
         * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
         * until to the next tick, similar to `setTimeout` with a timeout of `0`.
         *
         * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
         * for details over the differences between `_.debounce` and `_.throttle`.
         *
         * @static
         * @memberOf _
         * @since 0.1.0
         * @category Function
         * @param {Function} func The function to debounce.
         * @param {number} [wait=0] The number of milliseconds to delay.
         * @param {Object} [options={}] The options object.
         * @param {boolean} [options.leading=false]
         *  Specify invoking on the leading edge of the timeout.
         * @param {number} [options.maxWait]
         *  The maximum time `func` is allowed to be delayed before it's invoked.
         * @param {boolean} [options.trailing=true]
         *  Specify invoking on the trailing edge of the timeout.
         * @returns {Function} Returns the new debounced function.
         * @example
         *
         * // Avoid costly calculations while the window size is in flux.
         * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
         *
         * // Invoke `sendMail` when clicked, debouncing subsequent calls.
         * jQuery(element).on('click', _.debounce(sendMail, 300, {
         *   'leading': true,
         *   'trailing': false
         * }));
         *
         * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
         * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
         * var source = new EventSource('/stream');
         * jQuery(source).on('message', debounced);
         *
         * // Cancel the trailing debounced invocation.
         * jQuery(window).on('popstate', debounced.cancel);
         */
        function debounce(func, wait, options) {
            var lastArgs,
                lastThis,
                maxWait,
                result,
                timerId,
                lastCallTime,
                lastInvokeTime = 0,
                leading = false,
                maxing = false,
                trailing = true;

            if (typeof func != 'function') {
                throw new TypeError(FUNC_ERROR_TEXT);
            }
            wait = toNumber(wait) || 0;
            if (isObject(options)) {
                leading = !!options.leading;
                maxing = 'maxWait' in options;
                maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
                trailing = 'trailing' in options ? !!options.trailing : trailing;
            }

            function invokeFunc(time) {
                var args = lastArgs,
                    thisArg = lastThis;

                lastArgs = lastThis = undefined;
                lastInvokeTime = time;
                result = func.apply(thisArg, args);
                return result;
            }

            function leadingEdge(time) {
// Reset any `maxWait` timer.
                lastInvokeTime = time;
// Start the timer for the trailing edge.
                timerId = setTimeout(timerExpired, wait);
// Invoke the leading edge.
                return leading ? invokeFunc(time) : result;
            }

            function remainingWait(time) {
                var timeSinceLastCall = time - lastCallTime,
                    timeSinceLastInvoke = time - lastInvokeTime,
                    timeWaiting = wait - timeSinceLastCall;

                return maxing
                    ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke)
                    : timeWaiting;
            }

            function shouldInvoke(time) {
                var timeSinceLastCall = time - lastCallTime,
                    timeSinceLastInvoke = time - lastInvokeTime;

// Either this is the first call, activity has stopped and we're at the
// trailing edge, the system time has gone backwards and we're treating
// it as the trailing edge, or we've hit the `maxWait` limit.
                return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
                    (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
            }

            function timerExpired() {
                var time = now();
                if (shouldInvoke(time)) {
                    return trailingEdge(time);
                }
// Restart the timer.
                timerId = setTimeout(timerExpired, remainingWait(time));
            }

            function trailingEdge(time) {
                timerId = undefined;

// Only invoke if we have `lastArgs` which means `func` has been
// debounced at least once.
                if (trailing && lastArgs) {
                    return invokeFunc(time);
                }
                lastArgs = lastThis = undefined;
                return result;
            }

            function cancel() {
                if (timerId !== undefined) {
                    clearTimeout(timerId);
                }
                lastInvokeTime = 0;
                lastArgs = lastCallTime = lastThis = timerId = undefined;
            }

            function flush() {
                return timerId === undefined ? result : trailingEdge(now());
            }

            function debounced() {
                var time = now(),
                    isInvoking = shouldInvoke(time);

                lastArgs = arguments;
                lastThis = this;
                lastCallTime = time;

                if (isInvoking) {
                    if (timerId === undefined) {
                        return leadingEdge(lastCallTime);
                    }
                    if (maxing) {
// Handle invocations in a tight loop.
                        timerId = setTimeout(timerExpired, wait);
                        return invokeFunc(lastCallTime);
                    }
                }
                if (timerId === undefined) {
                    timerId = setTimeout(timerExpired, wait);
                }
                return result;
            }
            debounced.cancel = cancel;
            debounced.flush = flush;
            return debounced;
        }

        module.exports = debounce;


        /***/ }),

    /***/ "./node_modules/lodash/isObject.js":
    /*!*****************************************!*\
  !*** ./node_modules/lodash/isObject.js ***!
  \*****************************************/
    /*! no static exports found */
    /***/ (function(module, exports) {

        /**
         * Checks if `value` is the
         * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
         * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
         *
         * @static
         * @memberOf _
         * @since 0.1.0
         * @category Lang
         * @param {*} value The value to check.
         * @returns {boolean} Returns `true` if `value` is an object, else `false`.
         * @example
         *
         * _.isObject({});
         * // => true
         *
         * _.isObject([1, 2, 3]);
         * // => true
         *
         * _.isObject(_.noop);
         * // => true
         *
         * _.isObject(null);
         * // => false
         */
        function isObject(value) {
            var type = typeof value;
            return value != null && (type == 'object' || type == 'function');
        }

        module.exports = isObject;


        /***/ }),

    /***/ "./node_modules/lodash/isObjectLike.js":
    /*!*********************************************!*\
  !*** ./node_modules/lodash/isObjectLike.js ***!
  \*********************************************/
    /*! no static exports found */
    /***/ (function(module, exports) {

        /**
         * Checks if `value` is object-like. A value is object-like if it's not `null`
         * and has a `typeof` result of "object".
         *
         * @static
         * @memberOf _
         * @since 4.0.0
         * @category Lang
         * @param {*} value The value to check.
         * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
         * @example
         *
         * _.isObjectLike({});
         * // => true
         *
         * _.isObjectLike([1, 2, 3]);
         * // => true
         *
         * _.isObjectLike(_.noop);
         * // => false
         *
         * _.isObjectLike(null);
         * // => false
         */
        function isObjectLike(value) {
            return value != null && typeof value == 'object';
        }

        module.exports = isObjectLike;


        /***/ }),

    /***/ "./node_modules/lodash/isSymbol.js":
    /*!*****************************************!*\
  !*** ./node_modules/lodash/isSymbol.js ***!
  \*****************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {

        var baseGetTag = __webpack_require__(/*! ./_baseGetTag */ "./node_modules/lodash/_baseGetTag.js"),
            isObjectLike = __webpack_require__(/*! ./isObjectLike */ "./node_modules/lodash/isObjectLike.js");

        /** `Object#toString` result references. */
        var symbolTag = '[object Symbol]';

        /**
         * Checks if `value` is classified as a `Symbol` primitive or object.
         *
         * @static
         * @memberOf _
         * @since 4.0.0
         * @category Lang
         * @param {*} value The value to check.
         * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
         * @example
         *
         * _.isSymbol(Symbol.iterator);
         * // => true
         *
         * _.isSymbol('abc');
         * // => false
         */
        function isSymbol(value) {
            return typeof value == 'symbol' ||
                (isObjectLike(value) && baseGetTag(value) == symbolTag);
        }

        module.exports = isSymbol;


        /***/ }),

    /***/ "./node_modules/lodash/now.js":
    /*!************************************!*\
  !*** ./node_modules/lodash/now.js ***!
  \************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {

        var root = __webpack_require__(/*! ./_root */ "./node_modules/lodash/_root.js");

        /**
         * Gets the timestamp of the number of milliseconds that have elapsed since
         * the Unix epoch (1 January 1970 00:00:00 UTC).
         *
         * @static
         * @memberOf _
         * @since 2.4.0
         * @category Date
         * @returns {number} Returns the timestamp.
         * @example
         *
         * _.defer(function(stamp) {
         *   console.log(_.now() - stamp);
         * }, _.now());
         * // => Logs the number of milliseconds it took for the deferred invocation.
         */
        var now = function() {
            return root.Date.now();
        };

        module.exports = now;


        /***/ }),

    /***/ "./node_modules/lodash/toNumber.js":
    /*!*****************************************!*\
  !*** ./node_modules/lodash/toNumber.js ***!
  \*****************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {

        var isObject = __webpack_require__(/*! ./isObject */ "./node_modules/lodash/isObject.js"),
            isSymbol = __webpack_require__(/*! ./isSymbol */ "./node_modules/lodash/isSymbol.js");

        /** Used as references for various `Number` constants. */
        var NAN = 0 / 0;

        /** Used to match leading and trailing whitespace. */
        var reTrim = /^\s+|\s+$/g;

        /** Used to detect bad signed hexadecimal string values. */
        var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

        /** Used to detect binary string values. */
        var reIsBinary = /^0b[01]+$/i;

        /** Used to detect octal string values. */
        var reIsOctal = /^0o[0-7]+$/i;

        /** Built-in method references without a dependency on `root`. */
        var freeParseInt = parseInt;

        /**
         * Converts `value` to a number.
         *
         * @static
         * @memberOf _
         * @since 4.0.0
         * @category Lang
         * @param {*} value The value to process.
         * @returns {number} Returns the number.
         * @example
         *
         * _.toNumber(3.2);
         * // => 3.2
         *
         * _.toNumber(Number.MIN_VALUE);
         * // => 5e-324
         *
         * _.toNumber(Infinity);
         * // => Infinity
         *
         * _.toNumber('3.2');
         * // => 3.2
         */
        function toNumber(value) {
            if (typeof value == 'number') {
                return value;
            }
            if (isSymbol(value)) {
                return NAN;
            }
            if (isObject(value)) {
                var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
                value = isObject(other) ? (other + '') : other;
            }
            if (typeof value != 'string') {
                return value === 0 ? value : +value;
            }
            value = value.replace(reTrim, '');
            var isBinary = reIsBinary.test(value);
            return (isBinary || reIsOctal.test(value))
                ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
                : (reIsBadHex.test(value) ? NAN : +value);
        }

        module.exports = toNumber;


        /***/ }),

    /***/ "./node_modules/loglevelnext/dist/loglevelnext.js":
    /*!********************************************************!*\
  !*** ./node_modules/loglevelnext/dist/loglevelnext.js ***!
  \********************************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {

        (function webpackUniversalModuleDefinition(root, factory) {
            if(true)
                module.exports = factory();
            else {}
        })(window, function() {
            return /******/ (function(modules) { // webpackBootstrap
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
                        /******/ 			Object.defineProperty(exports, name, {
                            /******/ 				configurable: false,
                            /******/ 				enumerable: true,
                            /******/ 				get: getter
                            /******/ 			});
                        /******/ 		}
                    /******/ 	};
                /******/
                /******/ 	// define __esModule on exports
                /******/ 	__webpack_require__.r = function(exports) {
                    /******/ 		Object.defineProperty(exports, '__esModule', { value: true });
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
                /******/ 	__webpack_require__.p = "";
                /******/
                /******/
                /******/ 	// Load entry module and return exports
                /******/ 	return __webpack_require__(__webpack_require__.s = "./index.js");
                /******/ })
            /************************************************************************/
            /******/ ({

                /***/ "./factory/PrefixFactory.js":
                /*!**********************************!*\
  !*** ./factory/PrefixFactory.js ***!
  \**********************************/
                /*! no static exports found */
                /***/ (function(module, exports, __webpack_require__) {

                    "use strict";
                    eval("\n\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } _setPrototypeOf(subClass.prototype, superClass && superClass.prototype); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _get(target, property, receiver) { if (typeof Reflect !== \"undefined\" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }\n\nfunction _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.getPrototypeOf || function _getPrototypeOf(o) { return o.__proto__; }; return _getPrototypeOf(o); }\n\nvar MethodFactory = __webpack_require__(/*! ../lib/MethodFactory */ \"./lib/MethodFactory.js\");\n\nvar defaults = {\n  level: function level(opts) {\n    return \"[\".concat(opts.level, \"]\");\n  },\n  name: function name(opts) {\n    return opts.logger.name;\n  },\n  template: '{{time}} {{level}} ',\n  time: function time() {\n    return new Date().toTimeString().split(' ')[0];\n  }\n};\n\nmodule.exports =\n/*#__PURE__*/\nfunction (_MethodFactory) {\n  function PrefixFactory(logger, options) {\n    var _this;\n\n    _classCallCheck(this, PrefixFactory);\n\n    _this = _possibleConstructorReturn(this, _getPrototypeOf(PrefixFactory).call(this, logger));\n    _this.options = Object.assign({}, defaults, options);\n    return _this;\n  }\n\n  _createClass(PrefixFactory, [{\n    key: \"interpolate\",\n    value: function interpolate(level) {\n      var _this2 = this;\n\n      return this.options.template.replace(/{{([^{}]*)}}/g, function (stache, prop) {\n        var fn = _this2.options[prop];\n\n        if (fn) {\n          return fn({\n            level: level,\n            logger: _this2.logger\n          });\n        }\n\n        return stache;\n      });\n    }\n  }, {\n    key: \"make\",\n    value: function make(methodName) {\n      var _this3 = this;\n\n      var og = _get(_getPrototypeOf(PrefixFactory.prototype), \"make\", this).call(this, methodName);\n\n      return function () {\n        var output = _this3.interpolate(methodName);\n\n        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {\n          args[_key] = arguments[_key];\n        }\n\n        var first = args[0];\n\n        if (typeof first === 'string') {\n          args[0] = output + first;\n        } else {\n          args.unshift(output);\n        }\n\n        og.apply(void 0, args);\n      };\n    }\n  }]);\n\n  _inherits(PrefixFactory, _MethodFactory);\n\n  return PrefixFactory;\n}(MethodFactory);\n\n//# sourceURL=webpack://log/./factory/PrefixFactory.js?");

                    /***/ }),

                /***/ "./index.js":
                /*!******************!*\
  !*** ./index.js ***!
  \******************/
                /*! no static exports found */
                /***/ (function(module, exports, __webpack_require__) {

                    "use strict";
                    eval("\n\n__webpack_require__(/*! object.assign/shim */ \"./node_modules/object.assign/shim.js\")();\n\n__webpack_require__(/*! es6-symbol/implement */ \"./node_modules/es6-symbol/implement.js\");\n/* global window: true */\n\n\nvar LogLevel = __webpack_require__(/*! ./lib/LogLevel */ \"./lib/LogLevel.js\");\n\nvar MethodFactory = __webpack_require__(/*! ./lib/MethodFactory */ \"./lib/MethodFactory.js\");\n\nvar PrefixFactory = __webpack_require__(/*! ./factory/PrefixFactory */ \"./factory/PrefixFactory.js\");\n\nvar defaultLogger = new LogLevel({\n  name: 'default'\n});\nvar cache = {\n  default: defaultLogger\n}; // Grab the current global log variable in case of overwrite\n\nvar existing = typeof window !== 'undefined' ? window.log : null;\nmodule.exports = Object.assign(defaultLogger, {\n  get factories() {\n    return {\n      MethodFactory: MethodFactory,\n      PrefixFactory: PrefixFactory\n    };\n  },\n\n  get loggers() {\n    return cache;\n  },\n\n  getLogger: function getLogger(options) {\n    if (typeof options === 'string') {\n      options = {\n        name: options\n      };\n    }\n\n    if (!options.id) {\n      options.id = options.name;\n    }\n\n    var _options = options,\n        name = _options.name,\n        id = _options.id;\n    var defaults = {\n      level: defaultLogger.level\n    };\n\n    if (typeof name !== 'string' || !name || !name.length) {\n      throw new TypeError('You must supply a name when creating a logger.');\n    }\n\n    var logger = cache[id];\n\n    if (!logger) {\n      logger = new LogLevel(Object.assign({}, defaults, options));\n      cache[id] = logger;\n    }\n\n    return logger;\n  },\n  noConflict: function noConflict() {\n    if (typeof window !== 'undefined' && window.log === defaultLogger) {\n      window.log = existing;\n    }\n\n    return defaultLogger;\n  }\n});\n\n//# sourceURL=webpack://log/./index.js?");

                    /***/ }),

                /***/ "./lib/LogLevel.js":
                /*!*************************!*\
  !*** ./lib/LogLevel.js ***!
  \*************************/
                /*! no static exports found */
                /***/ (function(module, exports, __webpack_require__) {

                    "use strict";
                    eval("\n/* global window: true */\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar PrefixFactory = __webpack_require__(/*! ../factory/PrefixFactory */ \"./factory/PrefixFactory.js\");\n\nvar MethodFactory = __webpack_require__(/*! ./MethodFactory */ \"./lib/MethodFactory.js\");\n\nvar defaults = {\n  factory: null,\n  level: 'warn',\n  name: +new Date(),\n  prefix: null\n};\n\nmodule.exports =\n/*#__PURE__*/\nfunction () {\n  function LogLevel(options) {\n    _classCallCheck(this, LogLevel);\n\n    // implement for some _very_ loose type checking. avoids getting into a\n    // circular require between MethodFactory and LogLevel\n    this.type = 'LogLevel';\n    this.options = Object.assign({}, defaults, options);\n    this.methodFactory = options.factory;\n\n    if (!this.methodFactory) {\n      var factory = options.prefix ? new PrefixFactory(this, options.prefix) : new MethodFactory(this);\n      this.methodFactory = factory;\n    }\n\n    if (!this.methodFactory.logger) {\n      this.methodFactory.logger = this;\n    }\n\n    this.name = options.name || '<unknown>'; // this.level is a setter, do this after setting up the factory\n\n    this.level = this.options.level;\n  }\n\n  _createClass(LogLevel, [{\n    key: \"disable\",\n    value: function disable() {\n      this.level = this.levels.SILENT;\n    }\n  }, {\n    key: \"enable\",\n    value: function enable() {\n      this.level = this.levels.TRACE;\n    }\n  }, {\n    key: \"factory\",\n    get: function get() {\n      return this.methodFactory;\n    },\n    set: function set(factory) {\n      factory.logger = this;\n      this.methodFactory = factory;\n      this.methodFactory.replaceMethods(this.level);\n    }\n  }, {\n    key: \"level\",\n    get: function get() {\n      return this.currentLevel;\n    },\n    set: function set(logLevel) {\n      var level = this.methodFactory.distillLevel(logLevel);\n\n      if (level == null) {\n        throw new Error(\"loglevelnext: setLevel() called with invalid level: \".concat(logLevel));\n      }\n\n      this.currentLevel = level;\n      this.methodFactory.replaceMethods(level);\n\n      if (typeof console === 'undefined' && level < this.levels.SILENT) {\n        // eslint-disable-next-line no-console\n        console.warn('loglevelnext: console is undefined. The log will produce no output.');\n      }\n    }\n  }, {\n    key: \"levels\",\n    get: function get() {\n      // eslint-disable-line class-methods-use-this\n      return this.methodFactory.levels;\n    }\n  }]);\n\n  return LogLevel;\n}();\n\n//# sourceURL=webpack://log/./lib/LogLevel.js?");

                    /***/ }),

                /***/ "./lib/MethodFactory.js":
                /*!******************************!*\
  !*** ./lib/MethodFactory.js ***!
  \******************************/
                /*! no static exports found */
                /***/ (function(module, exports, __webpack_require__) {

                    "use strict";
                    eval("\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar noop = function noop() {};\n\nvar levels = Symbol('valid log levels');\nvar instance = Symbol('a log instance');\n\nmodule.exports =\n/*#__PURE__*/\nfunction () {\n  function MethodFactory(logger) {\n    _classCallCheck(this, MethodFactory);\n\n    this[instance] = logger;\n    this[levels] = {\n      TRACE: 0,\n      DEBUG: 1,\n      INFO: 2,\n      WARN: 3,\n      ERROR: 4,\n      SILENT: 5\n    };\n  }\n\n  _createClass(MethodFactory, [{\n    key: \"bindMethod\",\n    // eslint-disable-next-line class-methods-use-this\n    value: function bindMethod(obj, methodName) {\n      var method = obj[methodName];\n\n      if (typeof method.bind === 'function') {\n        return method.bind(obj);\n      }\n\n      try {\n        return Function.prototype.bind.call(method, obj);\n      } catch (e) {\n        // Missing bind shim or IE8 + Modernizr, fallback to wrapping\n        return function result() {\n          // eslint-disable-next-line prefer-rest-params\n          return Function.prototype.apply.apply(method, [obj, arguments]);\n        };\n      }\n    }\n  }, {\n    key: \"distillLevel\",\n    value: function distillLevel(level) {\n      var result = level;\n\n      if (typeof result === 'string' && typeof this.levels[result.toUpperCase()] !== 'undefined') {\n        result = this.levels[result.toUpperCase()];\n      }\n\n      if (this.levelValid(result)) {\n        return result;\n      }\n    }\n  }, {\n    key: \"levelValid\",\n    value: function levelValid(level) {\n      if (typeof level === 'number' && level >= 0 && level <= this.levels.SILENT) {\n        return true;\n      }\n\n      return false;\n    }\n    /**\n     * Build the best logging method possible for this env\n     * Wherever possible we want to bind, not wrap, to preserve stack traces.\n     * Since we're targeting modern browsers, there's no need to wait for the\n     * console to become available.\n     */\n    // eslint-disable-next-line class-methods-use-this\n\n  }, {\n    key: \"make\",\n    value: function make(methodName) {\n      if (methodName === 'debug') {\n        methodName = 'log';\n      }\n      /* eslint-disable no-console */\n\n\n      if (typeof console[methodName] !== 'undefined') {\n        return this.bindMethod(console, methodName);\n      } else if (typeof console.log !== 'undefined') {\n        return this.bindMethod(console, 'log');\n      }\n      /* eslint-enable no-console */\n\n\n      return noop;\n    }\n  }, {\n    key: \"replaceMethods\",\n    value: function replaceMethods(logLevel) {\n      var _this = this;\n\n      var level = this.distillLevel(logLevel);\n\n      if (level == null) {\n        throw new Error(\"loglevelnext: replaceMethods() called with invalid level: \".concat(logLevel));\n      }\n\n      if (!this.logger || this.logger.type !== 'LogLevel') {\n        throw new TypeError('loglevelnext: Logger is undefined or invalid. Please specify a valid Logger instance.');\n      }\n\n      this.methods.forEach(function (methodName) {\n        var methodLevel = _this.levels[methodName.toUpperCase()];\n\n        _this.logger[methodName] = methodLevel < level ? noop : _this.make(methodName);\n      }); // Define log.log as an alias for log.debug\n\n      this.logger.log = this.logger.debug;\n    }\n  }, {\n    key: \"levels\",\n    get: function get() {\n      return this[levels];\n    }\n  }, {\n    key: \"logger\",\n    get: function get() {\n      return this[instance];\n    },\n    set: function set(logger) {\n      this[instance] = logger;\n    }\n  }, {\n    key: \"methods\",\n    get: function get() {\n      return Object.keys(this.levels).map(function (key) {\n        return key.toLowerCase();\n      }).filter(function (key) {\n        return key !== 'silent';\n      });\n    }\n  }]);\n\n  return MethodFactory;\n}();\n\n//# sourceURL=webpack://log/./lib/MethodFactory.js?");

                    /***/ }),

                /***/ "./node_modules/d/index.js":
                /*!*********************************!*\
  !*** ./node_modules/d/index.js ***!
  \*********************************/
                /*! no static exports found */
                /***/ (function(module, exports, __webpack_require__) {

                    "use strict";
                    eval("\n\nvar assign        = __webpack_require__(/*! es5-ext/object/assign */ \"./node_modules/es5-ext/object/assign/index.js\")\n  , normalizeOpts = __webpack_require__(/*! es5-ext/object/normalize-options */ \"./node_modules/es5-ext/object/normalize-options.js\")\n  , isCallable    = __webpack_require__(/*! es5-ext/object/is-callable */ \"./node_modules/es5-ext/object/is-callable.js\")\n  , contains      = __webpack_require__(/*! es5-ext/string/#/contains */ \"./node_modules/es5-ext/string/#/contains/index.js\")\n\n  , d;\n\nd = module.exports = function (dscr, value/*, options*/) {\n\tvar c, e, w, options, desc;\n\tif ((arguments.length < 2) || (typeof dscr !== 'string')) {\n\t\toptions = value;\n\t\tvalue = dscr;\n\t\tdscr = null;\n\t} else {\n\t\toptions = arguments[2];\n\t}\n\tif (dscr == null) {\n\t\tc = w = true;\n\t\te = false;\n\t} else {\n\t\tc = contains.call(dscr, 'c');\n\t\te = contains.call(dscr, 'e');\n\t\tw = contains.call(dscr, 'w');\n\t}\n\n\tdesc = { value: value, configurable: c, enumerable: e, writable: w };\n\treturn !options ? desc : assign(normalizeOpts(options), desc);\n};\n\nd.gs = function (dscr, get, set/*, options*/) {\n\tvar c, e, options, desc;\n\tif (typeof dscr !== 'string') {\n\t\toptions = set;\n\t\tset = get;\n\t\tget = dscr;\n\t\tdscr = null;\n\t} else {\n\t\toptions = arguments[3];\n\t}\n\tif (get == null) {\n\t\tget = undefined;\n\t} else if (!isCallable(get)) {\n\t\toptions = get;\n\t\tget = set = undefined;\n\t} else if (set == null) {\n\t\tset = undefined;\n\t} else if (!isCallable(set)) {\n\t\toptions = set;\n\t\tset = undefined;\n\t}\n\tif (dscr == null) {\n\t\tc = true;\n\t\te = false;\n\t} else {\n\t\tc = contains.call(dscr, 'c');\n\t\te = contains.call(dscr, 'e');\n\t}\n\n\tdesc = { get: get, set: set, configurable: c, enumerable: e };\n\treturn !options ? desc : assign(normalizeOpts(options), desc);\n};\n\n\n//# sourceURL=webpack://log/./node_modules/d/index.js?");

                    /***/ }),

                /***/ "./node_modules/define-properties/index.js":
                /*!*************************************************!*\
  !*** ./node_modules/define-properties/index.js ***!
  \*************************************************/
                /*! no static exports found */
                /***/ (function(module, exports, __webpack_require__) {

                    "use strict";
                    eval("\n\nvar keys = __webpack_require__(/*! object-keys */ \"./node_modules/object-keys/index.js\");\nvar foreach = __webpack_require__(/*! foreach */ \"./node_modules/foreach/index.js\");\nvar hasSymbols = typeof Symbol === 'function' && typeof Symbol() === 'symbol';\n\nvar toStr = Object.prototype.toString;\n\nvar isFunction = function (fn) {\n\treturn typeof fn === 'function' && toStr.call(fn) === '[object Function]';\n};\n\nvar arePropertyDescriptorsSupported = function () {\n\tvar obj = {};\n\ttry {\n\t\tObject.defineProperty(obj, 'x', { enumerable: false, value: obj });\n        /* eslint-disable no-unused-vars, no-restricted-syntax */\n        for (var _ in obj) { return false; }\n        /* eslint-enable no-unused-vars, no-restricted-syntax */\n\t\treturn obj.x === obj;\n\t} catch (e) { /* this is IE 8. */\n\t\treturn false;\n\t}\n};\nvar supportsDescriptors = Object.defineProperty && arePropertyDescriptorsSupported();\n\nvar defineProperty = function (object, name, value, predicate) {\n\tif (name in object && (!isFunction(predicate) || !predicate())) {\n\t\treturn;\n\t}\n\tif (supportsDescriptors) {\n\t\tObject.defineProperty(object, name, {\n\t\t\tconfigurable: true,\n\t\t\tenumerable: false,\n\t\t\tvalue: value,\n\t\t\twritable: true\n\t\t});\n\t} else {\n\t\tobject[name] = value;\n\t}\n};\n\nvar defineProperties = function (object, map) {\n\tvar predicates = arguments.length > 2 ? arguments[2] : {};\n\tvar props = keys(map);\n\tif (hasSymbols) {\n\t\tprops = props.concat(Object.getOwnPropertySymbols(map));\n\t}\n\tforeach(props, function (name) {\n\t\tdefineProperty(object, name, map[name], predicates[name]);\n\t});\n};\n\ndefineProperties.supportsDescriptors = !!supportsDescriptors;\n\nmodule.exports = defineProperties;\n\n\n//# sourceURL=webpack://log/./node_modules/define-properties/index.js?");

                    /***/ }),

                /***/ "./node_modules/es5-ext/function/noop.js":
                /*!***********************************************!*\
  !*** ./node_modules/es5-ext/function/noop.js ***!
  \***********************************************/
                /*! no static exports found */
                /***/ (function(module, exports, __webpack_require__) {

                    "use strict";
                    eval("\n\n// eslint-disable-next-line no-empty-function\nmodule.exports = function () {};\n\n\n//# sourceURL=webpack://log/./node_modules/es5-ext/function/noop.js?");

                    /***/ }),

                /***/ "./node_modules/es5-ext/global.js":
                /*!****************************************!*\
  !*** ./node_modules/es5-ext/global.js ***!
  \****************************************/
                /*! no static exports found */
                /***/ (function(module, exports) {

                    eval("/* eslint strict: \"off\" */\n\nmodule.exports = (function () {\n\treturn this;\n}());\n\n\n//# sourceURL=webpack://log/./node_modules/es5-ext/global.js?");

                    /***/ }),

                /***/ "./node_modules/es5-ext/object/assign/index.js":
                /*!*****************************************************!*\
  !*** ./node_modules/es5-ext/object/assign/index.js ***!
  \*****************************************************/
                /*! no static exports found */
                /***/ (function(module, exports, __webpack_require__) {

                    "use strict";
                    eval("\n\nmodule.exports = __webpack_require__(/*! ./is-implemented */ \"./node_modules/es5-ext/object/assign/is-implemented.js\")()\n\t? Object.assign\n\t: __webpack_require__(/*! ./shim */ \"./node_modules/es5-ext/object/assign/shim.js\");\n\n\n//# sourceURL=webpack://log/./node_modules/es5-ext/object/assign/index.js?");

                    /***/ }),

                /***/ "./node_modules/es5-ext/object/assign/is-implemented.js":
                /*!**************************************************************!*\
  !*** ./node_modules/es5-ext/object/assign/is-implemented.js ***!
  \**************************************************************/
                /*! no static exports found */
                /***/ (function(module, exports, __webpack_require__) {

                    "use strict";
                    eval("\n\nmodule.exports = function () {\n\tvar assign = Object.assign, obj;\n\tif (typeof assign !== \"function\") return false;\n\tobj = { foo: \"raz\" };\n\tassign(obj, { bar: \"dwa\" }, { trzy: \"trzy\" });\n\treturn (obj.foo + obj.bar + obj.trzy) === \"razdwatrzy\";\n};\n\n\n//# sourceURL=webpack://log/./node_modules/es5-ext/object/assign/is-implemented.js?");

                    /***/ }),

                /***/ "./node_modules/es5-ext/object/assign/shim.js":
                /*!****************************************************!*\
  !*** ./node_modules/es5-ext/object/assign/shim.js ***!
  \****************************************************/
                /*! no static exports found */
                /***/ (function(module, exports, __webpack_require__) {

                    "use strict";
                    eval("\n\nvar keys  = __webpack_require__(/*! ../keys */ \"./node_modules/es5-ext/object/keys/index.js\")\n  , value = __webpack_require__(/*! ../valid-value */ \"./node_modules/es5-ext/object/valid-value.js\")\n  , max   = Math.max;\n\nmodule.exports = function (dest, src /*, …srcn*/) {\n\tvar error, i, length = max(arguments.length, 2), assign;\n\tdest = Object(value(dest));\n\tassign = function (key) {\n\t\ttry {\n\t\t\tdest[key] = src[key];\n\t\t} catch (e) {\n\t\t\tif (!error) error = e;\n\t\t}\n\t};\n\tfor (i = 1; i < length; ++i) {\n\t\tsrc = arguments[i];\n\t\tkeys(src).forEach(assign);\n\t}\n\tif (error !== undefined) throw error;\n\treturn dest;\n};\n\n\n//# sourceURL=webpack://log/./node_modules/es5-ext/object/assign/shim.js?");

                    /***/ }),

                /***/ "./node_modules/es5-ext/object/is-callable.js":
                /*!****************************************************!*\
  !*** ./node_modules/es5-ext/object/is-callable.js ***!
  \****************************************************/
                /*! no static exports found */
                /***/ (function(module, exports, __webpack_require__) {

                    "use strict";
                    eval("// Deprecated\n\n\n\nmodule.exports = function (obj) {\n return typeof obj === \"function\";\n};\n\n\n//# sourceURL=webpack://log/./node_modules/es5-ext/object/is-callable.js?");

                    /***/ }),

                /***/ "./node_modules/es5-ext/object/is-value.js":
                /*!*************************************************!*\
  !*** ./node_modules/es5-ext/object/is-value.js ***!
  \*************************************************/
                /*! no static exports found */
                /***/ (function(module, exports, __webpack_require__) {

                    "use strict";
                    eval("\n\nvar _undefined = __webpack_require__(/*! ../function/noop */ \"./node_modules/es5-ext/function/noop.js\")(); // Support ES3 engines\n\nmodule.exports = function (val) {\n return (val !== _undefined) && (val !== null);\n};\n\n\n//# sourceURL=webpack://log/./node_modules/es5-ext/object/is-value.js?");

                    /***/ }),

                /***/ "./node_modules/es5-ext/object/keys/index.js":
                /*!***************************************************!*\
  !*** ./node_modules/es5-ext/object/keys/index.js ***!
  \***************************************************/
                /*! no static exports found */
                /***/ (function(module, exports, __webpack_require__) {

                    "use strict";
                    eval("\n\nmodule.exports = __webpack_require__(/*! ./is-implemented */ \"./node_modules/es5-ext/object/keys/is-implemented.js\")()\n\t? Object.keys\n\t: __webpack_require__(/*! ./shim */ \"./node_modules/es5-ext/object/keys/shim.js\");\n\n\n//# sourceURL=webpack://log/./node_modules/es5-ext/object/keys/index.js?");

                    /***/ }),

                /***/ "./node_modules/es5-ext/object/keys/is-implemented.js":
                /*!************************************************************!*\
  !*** ./node_modules/es5-ext/object/keys/is-implemented.js ***!
  \************************************************************/
                /*! no static exports found */
                /***/ (function(module, exports, __webpack_require__) {

                    "use strict";
                    eval("\n\nmodule.exports = function () {\n\ttry {\n\t\tObject.keys(\"primitive\");\n\t\treturn true;\n\t} catch (e) {\n return false;\n}\n};\n\n\n//# sourceURL=webpack://log/./node_modules/es5-ext/object/keys/is-implemented.js?");

                    /***/ }),

                /***/ "./node_modules/es5-ext/object/keys/shim.js":
                /*!**************************************************!*\
  !*** ./node_modules/es5-ext/object/keys/shim.js ***!
  \**************************************************/
                /*! no static exports found */
                /***/ (function(module, exports, __webpack_require__) {

                    "use strict";
                    eval("\n\nvar isValue = __webpack_require__(/*! ../is-value */ \"./node_modules/es5-ext/object/is-value.js\");\n\nvar keys = Object.keys;\n\nmodule.exports = function (object) {\n\treturn keys(isValue(object) ? Object(object) : object);\n};\n\n\n//# sourceURL=webpack://log/./node_modules/es5-ext/object/keys/shim.js?");

                    /***/ }),

                /***/ "./node_modules/es5-ext/object/normalize-options.js":
                /*!**********************************************************!*\
  !*** ./node_modules/es5-ext/object/normalize-options.js ***!
  \**********************************************************/
                /*! no static exports found */
                /***/ (function(module, exports, __webpack_require__) {

                    "use strict";
                    eval("\n\nvar isValue = __webpack_require__(/*! ./is-value */ \"./node_modules/es5-ext/object/is-value.js\");\n\nvar forEach = Array.prototype.forEach, create = Object.create;\n\nvar process = function (src, obj) {\n\tvar key;\n\tfor (key in src) obj[key] = src[key];\n};\n\n// eslint-disable-next-line no-unused-vars\nmodule.exports = function (opts1 /*, …options*/) {\n\tvar result = create(null);\n\tforEach.call(arguments, function (options) {\n\t\tif (!isValue(options)) return;\n\t\tprocess(Object(options), result);\n\t});\n\treturn result;\n};\n\n\n//# sourceURL=webpack://log/./node_modules/es5-ext/object/normalize-options.js?");

                    /***/ }),

                /***/ "./node_modules/es5-ext/object/valid-value.js":
                /*!****************************************************!*\
  !*** ./node_modules/es5-ext/object/valid-value.js ***!
  \****************************************************/
                /*! no static exports found */
                /***/ (function(module, exports, __webpack_require__) {

                    "use strict";
                    eval("\n\nvar isValue = __webpack_require__(/*! ./is-value */ \"./node_modules/es5-ext/object/is-value.js\");\n\nmodule.exports = function (value) {\n\tif (!isValue(value)) throw new TypeError(\"Cannot use null or undefined\");\n\treturn value;\n};\n\n\n//# sourceURL=webpack://log/./node_modules/es5-ext/object/valid-value.js?");

                    /***/ }),

                /***/ "./node_modules/es5-ext/string/#/contains/index.js":
                /*!*********************************************************!*\
  !*** ./node_modules/es5-ext/string/#/contains/index.js ***!
  \*********************************************************/
                /*! no static exports found */
                /***/ (function(module, exports, __webpack_require__) {

                    "use strict";
                    eval("\n\nmodule.exports = __webpack_require__(/*! ./is-implemented */ \"./node_modules/es5-ext/string/#/contains/is-implemented.js\")()\n\t? String.prototype.contains\n\t: __webpack_require__(/*! ./shim */ \"./node_modules/es5-ext/string/#/contains/shim.js\");\n\n\n//# sourceURL=webpack://log/./node_modules/es5-ext/string/#/contains/index.js?");

                    /***/ }),

                /***/ "./node_modules/es5-ext/string/#/contains/is-implemented.js":
                /*!******************************************************************!*\
  !*** ./node_modules/es5-ext/string/#/contains/is-implemented.js ***!
  \******************************************************************/
                /*! no static exports found */
                /***/ (function(module, exports, __webpack_require__) {

                    "use strict";
                    eval("\n\nvar str = \"razdwatrzy\";\n\nmodule.exports = function () {\n\tif (typeof str.contains !== \"function\") return false;\n\treturn (str.contains(\"dwa\") === true) && (str.contains(\"foo\") === false);\n};\n\n\n//# sourceURL=webpack://log/./node_modules/es5-ext/string/#/contains/is-implemented.js?");

                    /***/ }),

                /***/ "./node_modules/es5-ext/string/#/contains/shim.js":
                /*!********************************************************!*\
  !*** ./node_modules/es5-ext/string/#/contains/shim.js ***!
  \********************************************************/
                /*! no static exports found */
                /***/ (function(module, exports, __webpack_require__) {

                    "use strict";
                    eval("\n\nvar indexOf = String.prototype.indexOf;\n\nmodule.exports = function (searchString/*, position*/) {\n\treturn indexOf.call(this, searchString, arguments[1]) > -1;\n};\n\n\n//# sourceURL=webpack://log/./node_modules/es5-ext/string/#/contains/shim.js?");

                    /***/ }),

                /***/ "./node_modules/es6-symbol/implement.js":
                /*!**********************************************!*\
  !*** ./node_modules/es6-symbol/implement.js ***!
  \**********************************************/
                /*! no static exports found */
                /***/ (function(module, exports, __webpack_require__) {

                    "use strict";
                    eval("\n\nif (!__webpack_require__(/*! ./is-implemented */ \"./node_modules/es6-symbol/is-implemented.js\")()) {\n\tObject.defineProperty(__webpack_require__(/*! es5-ext/global */ \"./node_modules/es5-ext/global.js\"), 'Symbol',\n\t\t{ value: __webpack_require__(/*! ./polyfill */ \"./node_modules/es6-symbol/polyfill.js\"), configurable: true, enumerable: false,\n\t\t\twritable: true });\n}\n\n\n//# sourceURL=webpack://log/./node_modules/es6-symbol/implement.js?");

                    /***/ }),

                /***/ "./node_modules/es6-symbol/is-implemented.js":
                /*!***************************************************!*\
  !*** ./node_modules/es6-symbol/is-implemented.js ***!
  \***************************************************/
                /*! no static exports found */
                /***/ (function(module, exports, __webpack_require__) {

                    "use strict";
                    eval("\n\nvar validTypes = { object: true, symbol: true };\n\nmodule.exports = function () {\n\tvar symbol;\n\tif (typeof Symbol !== 'function') return false;\n\tsymbol = Symbol('test symbol');\n\ttry { String(symbol); } catch (e) { return false; }\n\n\t// Return 'true' also for polyfills\n\tif (!validTypes[typeof Symbol.iterator]) return false;\n\tif (!validTypes[typeof Symbol.toPrimitive]) return false;\n\tif (!validTypes[typeof Symbol.toStringTag]) return false;\n\n\treturn true;\n};\n\n\n//# sourceURL=webpack://log/./node_modules/es6-symbol/is-implemented.js?");

                    /***/ }),

                /***/ "./node_modules/es6-symbol/is-symbol.js":
                /*!**********************************************!*\
  !*** ./node_modules/es6-symbol/is-symbol.js ***!
  \**********************************************/
                /*! no static exports found */
                /***/ (function(module, exports, __webpack_require__) {

                    "use strict";
                    eval("\n\nmodule.exports = function (x) {\n\tif (!x) return false;\n\tif (typeof x === 'symbol') return true;\n\tif (!x.constructor) return false;\n\tif (x.constructor.name !== 'Symbol') return false;\n\treturn (x[x.constructor.toStringTag] === 'Symbol');\n};\n\n\n//# sourceURL=webpack://log/./node_modules/es6-symbol/is-symbol.js?");

                    /***/ }),

                /***/ "./node_modules/es6-symbol/polyfill.js":
                /*!*********************************************!*\
  !*** ./node_modules/es6-symbol/polyfill.js ***!
  \*********************************************/
                /*! no static exports found */
                /***/ (function(module, exports, __webpack_require__) {

                    "use strict";
                    eval("// ES2015 Symbol polyfill for environments that do not (or partially) support it\n\n\n\nvar d              = __webpack_require__(/*! d */ \"./node_modules/d/index.js\")\n  , validateSymbol = __webpack_require__(/*! ./validate-symbol */ \"./node_modules/es6-symbol/validate-symbol.js\")\n\n  , create = Object.create, defineProperties = Object.defineProperties\n  , defineProperty = Object.defineProperty, objPrototype = Object.prototype\n  , NativeSymbol, SymbolPolyfill, HiddenSymbol, globalSymbols = create(null)\n  , isNativeSafe;\n\nif (typeof Symbol === 'function') {\n\tNativeSymbol = Symbol;\n\ttry {\n\t\tString(NativeSymbol());\n\t\tisNativeSafe = true;\n\t} catch (ignore) {}\n}\n\nvar generateName = (function () {\n\tvar created = create(null);\n\treturn function (desc) {\n\t\tvar postfix = 0, name, ie11BugWorkaround;\n\t\twhile (created[desc + (postfix || '')]) ++postfix;\n\t\tdesc += (postfix || '');\n\t\tcreated[desc] = true;\n\t\tname = '@@' + desc;\n\t\tdefineProperty(objPrototype, name, d.gs(null, function (value) {\n\t\t\t// For IE11 issue see:\n\t\t\t// https://connect.microsoft.com/IE/feedbackdetail/view/1928508/\n\t\t\t//    ie11-broken-getters-on-dom-objects\n\t\t\t// https://github.com/medikoo/es6-symbol/issues/12\n\t\t\tif (ie11BugWorkaround) return;\n\t\t\tie11BugWorkaround = true;\n\t\t\tdefineProperty(this, name, d(value));\n\t\t\tie11BugWorkaround = false;\n\t\t}));\n\t\treturn name;\n\t};\n}());\n\n// Internal constructor (not one exposed) for creating Symbol instances.\n// This one is used to ensure that `someSymbol instanceof Symbol` always return false\nHiddenSymbol = function Symbol(description) {\n\tif (this instanceof HiddenSymbol) throw new TypeError('Symbol is not a constructor');\n\treturn SymbolPolyfill(description);\n};\n\n// Exposed `Symbol` constructor\n// (returns instances of HiddenSymbol)\nmodule.exports = SymbolPolyfill = function Symbol(description) {\n\tvar symbol;\n\tif (this instanceof Symbol) throw new TypeError('Symbol is not a constructor');\n\tif (isNativeSafe) return NativeSymbol(description);\n\tsymbol = create(HiddenSymbol.prototype);\n\tdescription = (description === undefined ? '' : String(description));\n\treturn defineProperties(symbol, {\n\t\t__description__: d('', description),\n\t\t__name__: d('', generateName(description))\n\t});\n};\ndefineProperties(SymbolPolyfill, {\n\tfor: d(function (key) {\n\t\tif (globalSymbols[key]) return globalSymbols[key];\n\t\treturn (globalSymbols[key] = SymbolPolyfill(String(key)));\n\t}),\n\tkeyFor: d(function (s) {\n\t\tvar key;\n\t\tvalidateSymbol(s);\n\t\tfor (key in globalSymbols) if (globalSymbols[key] === s) return key;\n\t}),\n\n\t// To ensure proper interoperability with other native functions (e.g. Array.from)\n\t// fallback to eventual native implementation of given symbol\n\thasInstance: d('', (NativeSymbol && NativeSymbol.hasInstance) || SymbolPolyfill('hasInstance')),\n\tisConcatSpreadable: d('', (NativeSymbol && NativeSymbol.isConcatSpreadable) ||\n\t\tSymbolPolyfill('isConcatSpreadable')),\n\titerator: d('', (NativeSymbol && NativeSymbol.iterator) || SymbolPolyfill('iterator')),\n\tmatch: d('', (NativeSymbol && NativeSymbol.match) || SymbolPolyfill('match')),\n\treplace: d('', (NativeSymbol && NativeSymbol.replace) || SymbolPolyfill('replace')),\n\tsearch: d('', (NativeSymbol && NativeSymbol.search) || SymbolPolyfill('search')),\n\tspecies: d('', (NativeSymbol && NativeSymbol.species) || SymbolPolyfill('species')),\n\tsplit: d('', (NativeSymbol && NativeSymbol.split) || SymbolPolyfill('split')),\n\ttoPrimitive: d('', (NativeSymbol && NativeSymbol.toPrimitive) || SymbolPolyfill('toPrimitive')),\n\ttoStringTag: d('', (NativeSymbol && NativeSymbol.toStringTag) || SymbolPolyfill('toStringTag')),\n\tunscopables: d('', (NativeSymbol && NativeSymbol.unscopables) || SymbolPolyfill('unscopables'))\n});\n\n// Internal tweaks for real symbol producer\ndefineProperties(HiddenSymbol.prototype, {\n\tconstructor: d(SymbolPolyfill),\n\ttoString: d('', function () { return this.__name__; })\n});\n\n// Proper implementation of methods exposed on Symbol.prototype\n// They won't be accessible on produced symbol instances as they derive from HiddenSymbol.prototype\ndefineProperties(SymbolPolyfill.prototype, {\n\ttoString: d(function () { return 'Symbol (' + validateSymbol(this).__description__ + ')'; }),\n\tvalueOf: d(function () { return validateSymbol(this); })\n});\ndefineProperty(SymbolPolyfill.prototype, SymbolPolyfill.toPrimitive, d('', function () {\n\tvar symbol = validateSymbol(this);\n\tif (typeof symbol === 'symbol') return symbol;\n\treturn symbol.toString();\n}));\ndefineProperty(SymbolPolyfill.prototype, SymbolPolyfill.toStringTag, d('c', 'Symbol'));\n\n// Proper implementaton of toPrimitive and toStringTag for returned symbol instances\ndefineProperty(HiddenSymbol.prototype, SymbolPolyfill.toStringTag,\n\td('c', SymbolPolyfill.prototype[SymbolPolyfill.toStringTag]));\n\n// Note: It's important to define `toPrimitive` as last one, as some implementations\n// implement `toPrimitive` natively without implementing `toStringTag` (or other specified symbols)\n// And that may invoke error in definition flow:\n// See: https://github.com/medikoo/es6-symbol/issues/13#issuecomment-164146149\ndefineProperty(HiddenSymbol.prototype, SymbolPolyfill.toPrimitive,\n\td('c', SymbolPolyfill.prototype[SymbolPolyfill.toPrimitive]));\n\n\n//# sourceURL=webpack://log/./node_modules/es6-symbol/polyfill.js?");

                    /***/ }),

                /***/ "./node_modules/es6-symbol/validate-symbol.js":
                /*!****************************************************!*\
  !*** ./node_modules/es6-symbol/validate-symbol.js ***!
  \****************************************************/
                /*! no static exports found */
                /***/ (function(module, exports, __webpack_require__) {

                    "use strict";
                    eval("\n\nvar isSymbol = __webpack_require__(/*! ./is-symbol */ \"./node_modules/es6-symbol/is-symbol.js\");\n\nmodule.exports = function (value) {\n\tif (!isSymbol(value)) throw new TypeError(value + \" is not a symbol\");\n\treturn value;\n};\n\n\n//# sourceURL=webpack://log/./node_modules/es6-symbol/validate-symbol.js?");

                    /***/ }),

                /***/ "./node_modules/foreach/index.js":
                /*!***************************************!*\
  !*** ./node_modules/foreach/index.js ***!
  \***************************************/
                /*! no static exports found */
                /***/ (function(module, exports) {

                    eval("\nvar hasOwn = Object.prototype.hasOwnProperty;\nvar toString = Object.prototype.toString;\n\nmodule.exports = function forEach (obj, fn, ctx) {\n    if (toString.call(fn) !== '[object Function]') {\n        throw new TypeError('iterator must be a function');\n    }\n    var l = obj.length;\n    if (l === +l) {\n        for (var i = 0; i < l; i++) {\n            fn.call(ctx, obj[i], i, obj);\n        }\n    } else {\n        for (var k in obj) {\n            if (hasOwn.call(obj, k)) {\n                fn.call(ctx, obj[k], k, obj);\n            }\n        }\n    }\n};\n\n\n\n//# sourceURL=webpack://log/./node_modules/foreach/index.js?");

                    /***/ }),

                /***/ "./node_modules/function-bind/implementation.js":
                /*!******************************************************!*\
  !*** ./node_modules/function-bind/implementation.js ***!
  \******************************************************/
                /*! no static exports found */
                /***/ (function(module, exports, __webpack_require__) {

                    "use strict";
                    eval("\n\n/* eslint no-invalid-this: 1 */\n\nvar ERROR_MESSAGE = 'Function.prototype.bind called on incompatible ';\nvar slice = Array.prototype.slice;\nvar toStr = Object.prototype.toString;\nvar funcType = '[object Function]';\n\nmodule.exports = function bind(that) {\n    var target = this;\n    if (typeof target !== 'function' || toStr.call(target) !== funcType) {\n        throw new TypeError(ERROR_MESSAGE + target);\n    }\n    var args = slice.call(arguments, 1);\n\n    var bound;\n    var binder = function () {\n        if (this instanceof bound) {\n            var result = target.apply(\n                this,\n                args.concat(slice.call(arguments))\n            );\n            if (Object(result) === result) {\n                return result;\n            }\n            return this;\n        } else {\n            return target.apply(\n                that,\n                args.concat(slice.call(arguments))\n            );\n        }\n    };\n\n    var boundLength = Math.max(0, target.length - args.length);\n    var boundArgs = [];\n    for (var i = 0; i < boundLength; i++) {\n        boundArgs.push('$' + i);\n    }\n\n    bound = Function('binder', 'return function (' + boundArgs.join(',') + '){ return binder.apply(this,arguments); }')(binder);\n\n    if (target.prototype) {\n        var Empty = function Empty() {};\n        Empty.prototype = target.prototype;\n        bound.prototype = new Empty();\n        Empty.prototype = null;\n    }\n\n    return bound;\n};\n\n\n//# sourceURL=webpack://log/./node_modules/function-bind/implementation.js?");

                    /***/ }),

                /***/ "./node_modules/function-bind/index.js":
                /*!*********************************************!*\
  !*** ./node_modules/function-bind/index.js ***!
  \*********************************************/
                /*! no static exports found */
                /***/ (function(module, exports, __webpack_require__) {

                    "use strict";
                    eval("\n\nvar implementation = __webpack_require__(/*! ./implementation */ \"./node_modules/function-bind/implementation.js\");\n\nmodule.exports = Function.prototype.bind || implementation;\n\n\n//# sourceURL=webpack://log/./node_modules/function-bind/index.js?");

                    /***/ }),

                /***/ "./node_modules/has-symbols/shams.js":
                /*!*******************************************!*\
  !*** ./node_modules/has-symbols/shams.js ***!
  \*******************************************/
                /*! no static exports found */
                /***/ (function(module, exports, __webpack_require__) {

                    "use strict";
                    eval("\n\n/* eslint complexity: [2, 17], max-statements: [2, 33] */\nmodule.exports = function hasSymbols() {\n\tif (typeof Symbol !== 'function' || typeof Object.getOwnPropertySymbols !== 'function') { return false; }\n\tif (typeof Symbol.iterator === 'symbol') { return true; }\n\n\tvar obj = {};\n\tvar sym = Symbol('test');\n\tvar symObj = Object(sym);\n\tif (typeof sym === 'string') { return false; }\n\n\tif (Object.prototype.toString.call(sym) !== '[object Symbol]') { return false; }\n\tif (Object.prototype.toString.call(symObj) !== '[object Symbol]') { return false; }\n\n\t// temp disabled per https://github.com/ljharb/object.assign/issues/17\n\t// if (sym instanceof Symbol) { return false; }\n\t// temp disabled per https://github.com/WebReflection/get-own-property-symbols/issues/4\n\t// if (!(symObj instanceof Symbol)) { return false; }\n\n\t// if (typeof Symbol.prototype.toString !== 'function') { return false; }\n\t// if (String(sym) !== Symbol.prototype.toString.call(sym)) { return false; }\n\n\tvar symVal = 42;\n\tobj[sym] = symVal;\n\tfor (sym in obj) { return false; } // eslint-disable-line no-restricted-syntax\n\tif (typeof Object.keys === 'function' && Object.keys(obj).length !== 0) { return false; }\n\n\tif (typeof Object.getOwnPropertyNames === 'function' && Object.getOwnPropertyNames(obj).length !== 0) { return false; }\n\n\tvar syms = Object.getOwnPropertySymbols(obj);\n\tif (syms.length !== 1 || syms[0] !== sym) { return false; }\n\n\tif (!Object.prototype.propertyIsEnumerable.call(obj, sym)) { return false; }\n\n\tif (typeof Object.getOwnPropertyDescriptor === 'function') {\n\t\tvar descriptor = Object.getOwnPropertyDescriptor(obj, sym);\n\t\tif (descriptor.value !== symVal || descriptor.enumerable !== true) { return false; }\n\t}\n\n\treturn true;\n};\n\n\n//# sourceURL=webpack://log/./node_modules/has-symbols/shams.js?");

                    /***/ }),

                /***/ "./node_modules/object-keys/index.js":
                /*!*******************************************!*\
  !*** ./node_modules/object-keys/index.js ***!
  \*******************************************/
                /*! no static exports found */
                /***/ (function(module, exports, __webpack_require__) {

                    "use strict";
                    eval("\n\n// modified from https://github.com/es-shims/es5-shim\nvar has = Object.prototype.hasOwnProperty;\nvar toStr = Object.prototype.toString;\nvar slice = Array.prototype.slice;\nvar isArgs = __webpack_require__(/*! ./isArguments */ \"./node_modules/object-keys/isArguments.js\");\nvar isEnumerable = Object.prototype.propertyIsEnumerable;\nvar hasDontEnumBug = !isEnumerable.call({ toString: null }, 'toString');\nvar hasProtoEnumBug = isEnumerable.call(function () {}, 'prototype');\nvar dontEnums = [\n\t'toString',\n\t'toLocaleString',\n\t'valueOf',\n\t'hasOwnProperty',\n\t'isPrototypeOf',\n\t'propertyIsEnumerable',\n\t'constructor'\n];\nvar equalsConstructorPrototype = function (o) {\n\tvar ctor = o.constructor;\n\treturn ctor && ctor.prototype === o;\n};\nvar excludedKeys = {\n\t$console: true,\n\t$external: true,\n\t$frame: true,\n\t$frameElement: true,\n\t$frames: true,\n\t$innerHeight: true,\n\t$innerWidth: true,\n\t$outerHeight: true,\n\t$outerWidth: true,\n\t$pageXOffset: true,\n\t$pageYOffset: true,\n\t$parent: true,\n\t$scrollLeft: true,\n\t$scrollTop: true,\n\t$scrollX: true,\n\t$scrollY: true,\n\t$self: true,\n\t$webkitIndexedDB: true,\n\t$webkitStorageInfo: true,\n\t$window: true\n};\nvar hasAutomationEqualityBug = (function () {\n\t/* global window */\n\tif (typeof window === 'undefined') { return false; }\n\tfor (var k in window) {\n\t\ttry {\n\t\t\tif (!excludedKeys['$' + k] && has.call(window, k) && window[k] !== null && typeof window[k] === 'object') {\n\t\t\t\ttry {\n\t\t\t\t\tequalsConstructorPrototype(window[k]);\n\t\t\t\t} catch (e) {\n\t\t\t\t\treturn true;\n\t\t\t\t}\n\t\t\t}\n\t\t} catch (e) {\n\t\t\treturn true;\n\t\t}\n\t}\n\treturn false;\n}());\nvar equalsConstructorPrototypeIfNotBuggy = function (o) {\n\t/* global window */\n\tif (typeof window === 'undefined' || !hasAutomationEqualityBug) {\n\t\treturn equalsConstructorPrototype(o);\n\t}\n\ttry {\n\t\treturn equalsConstructorPrototype(o);\n\t} catch (e) {\n\t\treturn false;\n\t}\n};\n\nvar keysShim = function keys(object) {\n\tvar isObject = object !== null && typeof object === 'object';\n\tvar isFunction = toStr.call(object) === '[object Function]';\n\tvar isArguments = isArgs(object);\n\tvar isString = isObject && toStr.call(object) === '[object String]';\n\tvar theKeys = [];\n\n\tif (!isObject && !isFunction && !isArguments) {\n\t\tthrow new TypeError('Object.keys called on a non-object');\n\t}\n\n\tvar skipProto = hasProtoEnumBug && isFunction;\n\tif (isString && object.length > 0 && !has.call(object, 0)) {\n\t\tfor (var i = 0; i < object.length; ++i) {\n\t\t\ttheKeys.push(String(i));\n\t\t}\n\t}\n\n\tif (isArguments && object.length > 0) {\n\t\tfor (var j = 0; j < object.length; ++j) {\n\t\t\ttheKeys.push(String(j));\n\t\t}\n\t} else {\n\t\tfor (var name in object) {\n\t\t\tif (!(skipProto && name === 'prototype') && has.call(object, name)) {\n\t\t\t\ttheKeys.push(String(name));\n\t\t\t}\n\t\t}\n\t}\n\n\tif (hasDontEnumBug) {\n\t\tvar skipConstructor = equalsConstructorPrototypeIfNotBuggy(object);\n\n\t\tfor (var k = 0; k < dontEnums.length; ++k) {\n\t\t\tif (!(skipConstructor && dontEnums[k] === 'constructor') && has.call(object, dontEnums[k])) {\n\t\t\t\ttheKeys.push(dontEnums[k]);\n\t\t\t}\n\t\t}\n\t}\n\treturn theKeys;\n};\n\nkeysShim.shim = function shimObjectKeys() {\n\tif (Object.keys) {\n\t\tvar keysWorksWithArguments = (function () {\n\t\t\t// Safari 5.0 bug\n\t\t\treturn (Object.keys(arguments) || '').length === 2;\n\t\t}(1, 2));\n\t\tif (!keysWorksWithArguments) {\n\t\t\tvar originalKeys = Object.keys;\n\t\t\tObject.keys = function keys(object) {\n\t\t\t\tif (isArgs(object)) {\n\t\t\t\t\treturn originalKeys(slice.call(object));\n\t\t\t\t} else {\n\t\t\t\t\treturn originalKeys(object);\n\t\t\t\t}\n\t\t\t};\n\t\t}\n\t} else {\n\t\tObject.keys = keysShim;\n\t}\n\treturn Object.keys || keysShim;\n};\n\nmodule.exports = keysShim;\n\n\n//# sourceURL=webpack://log/./node_modules/object-keys/index.js?");

                    /***/ }),

                /***/ "./node_modules/object-keys/isArguments.js":
                /*!*************************************************!*\
  !*** ./node_modules/object-keys/isArguments.js ***!
  \*************************************************/
                /*! no static exports found */
                /***/ (function(module, exports, __webpack_require__) {

                    "use strict";
                    eval("\n\nvar toStr = Object.prototype.toString;\n\nmodule.exports = function isArguments(value) {\n\tvar str = toStr.call(value);\n\tvar isArgs = str === '[object Arguments]';\n\tif (!isArgs) {\n\t\tisArgs = str !== '[object Array]' &&\n\t\t\tvalue !== null &&\n\t\t\ttypeof value === 'object' &&\n\t\t\ttypeof value.length === 'number' &&\n\t\t\tvalue.length >= 0 &&\n\t\t\ttoStr.call(value.callee) === '[object Function]';\n\t}\n\treturn isArgs;\n};\n\n\n//# sourceURL=webpack://log/./node_modules/object-keys/isArguments.js?");

                    /***/ }),

                /***/ "./node_modules/object.assign/implementation.js":
                /*!******************************************************!*\
  !*** ./node_modules/object.assign/implementation.js ***!
  \******************************************************/
                /*! no static exports found */
                /***/ (function(module, exports, __webpack_require__) {

                    "use strict";
                    eval("\n\n// modified from https://github.com/es-shims/es6-shim\nvar keys = __webpack_require__(/*! object-keys */ \"./node_modules/object-keys/index.js\");\nvar bind = __webpack_require__(/*! function-bind */ \"./node_modules/function-bind/index.js\");\nvar canBeObject = function (obj) {\n\treturn typeof obj !== 'undefined' && obj !== null;\n};\nvar hasSymbols = __webpack_require__(/*! has-symbols/shams */ \"./node_modules/has-symbols/shams.js\")();\nvar toObject = Object;\nvar push = bind.call(Function.call, Array.prototype.push);\nvar propIsEnumerable = bind.call(Function.call, Object.prototype.propertyIsEnumerable);\nvar originalGetSymbols = hasSymbols ? Object.getOwnPropertySymbols : null;\n\nmodule.exports = function assign(target, source1) {\n\tif (!canBeObject(target)) { throw new TypeError('target must be an object'); }\n\tvar objTarget = toObject(target);\n\tvar s, source, i, props, syms, value, key;\n\tfor (s = 1; s < arguments.length; ++s) {\n\t\tsource = toObject(arguments[s]);\n\t\tprops = keys(source);\n\t\tvar getSymbols = hasSymbols && (Object.getOwnPropertySymbols || originalGetSymbols);\n\t\tif (getSymbols) {\n\t\t\tsyms = getSymbols(source);\n\t\t\tfor (i = 0; i < syms.length; ++i) {\n\t\t\t\tkey = syms[i];\n\t\t\t\tif (propIsEnumerable(source, key)) {\n\t\t\t\t\tpush(props, key);\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t\tfor (i = 0; i < props.length; ++i) {\n\t\t\tkey = props[i];\n\t\t\tvalue = source[key];\n\t\t\tif (propIsEnumerable(source, key)) {\n\t\t\t\tobjTarget[key] = value;\n\t\t\t}\n\t\t}\n\t}\n\treturn objTarget;\n};\n\n\n//# sourceURL=webpack://log/./node_modules/object.assign/implementation.js?");

                    /***/ }),

                /***/ "./node_modules/object.assign/polyfill.js":
                /*!************************************************!*\
  !*** ./node_modules/object.assign/polyfill.js ***!
  \************************************************/
                /*! no static exports found */
                /***/ (function(module, exports, __webpack_require__) {

                    "use strict";
                    eval("\n\nvar implementation = __webpack_require__(/*! ./implementation */ \"./node_modules/object.assign/implementation.js\");\n\nvar lacksProperEnumerationOrder = function () {\n\tif (!Object.assign) {\n\t\treturn false;\n\t}\n\t// v8, specifically in node 4.x, has a bug with incorrect property enumeration order\n\t// note: this does not detect the bug unless there's 20 characters\n\tvar str = 'abcdefghijklmnopqrst';\n\tvar letters = str.split('');\n\tvar map = {};\n\tfor (var i = 0; i < letters.length; ++i) {\n\t\tmap[letters[i]] = letters[i];\n\t}\n\tvar obj = Object.assign({}, map);\n\tvar actual = '';\n\tfor (var k in obj) {\n\t\tactual += k;\n\t}\n\treturn str !== actual;\n};\n\nvar assignHasPendingExceptions = function () {\n\tif (!Object.assign || !Object.preventExtensions) {\n\t\treturn false;\n\t}\n\t// Firefox 37 still has \"pending exception\" logic in its Object.assign implementation,\n\t// which is 72% slower than our shim, and Firefox 40's native implementation.\n\tvar thrower = Object.preventExtensions({ 1: 2 });\n\ttry {\n\t\tObject.assign(thrower, 'xy');\n\t} catch (e) {\n\t\treturn thrower[1] === 'y';\n\t}\n\treturn false;\n};\n\nmodule.exports = function getPolyfill() {\n\tif (!Object.assign) {\n\t\treturn implementation;\n\t}\n\tif (lacksProperEnumerationOrder()) {\n\t\treturn implementation;\n\t}\n\tif (assignHasPendingExceptions()) {\n\t\treturn implementation;\n\t}\n\treturn Object.assign;\n};\n\n\n//# sourceURL=webpack://log/./node_modules/object.assign/polyfill.js?");

                    /***/ }),

                /***/ "./node_modules/object.assign/shim.js":
                /*!********************************************!*\
  !*** ./node_modules/object.assign/shim.js ***!
  \********************************************/
                /*! no static exports found */
                /***/ (function(module, exports, __webpack_require__) {

                    "use strict";
                    eval("\n\nvar define = __webpack_require__(/*! define-properties */ \"./node_modules/define-properties/index.js\");\nvar getPolyfill = __webpack_require__(/*! ./polyfill */ \"./node_modules/object.assign/polyfill.js\");\n\nmodule.exports = function shimAssign() {\n\tvar polyfill = getPolyfill();\n\tdefine(\n\t\tObject,\n\t\t{ assign: polyfill },\n\t\t{ assign: function () { return Object.assign !== polyfill; } }\n\t);\n\treturn polyfill;\n};\n\n\n//# sourceURL=webpack://log/./node_modules/object.assign/shim.js?");

                    /***/ })

                /******/ });
        });

        /***/ }),

    /***/ "./node_modules/normalize-url/index.js":
    /*!*********************************************!*\
  !*** ./node_modules/normalize-url/index.js ***!
  \*********************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {

        "use strict";

        var url = __webpack_require__(/*! url */ "./node_modules/url/url.js");
        var punycode = __webpack_require__(/*! punycode */ "./node_modules/punycode/punycode.js");
        var queryString = __webpack_require__(/*! query-string */ "./node_modules/query-string/index.js");
        var prependHttp = __webpack_require__(/*! prepend-http */ "./node_modules/prepend-http/index.js");
        var sortKeys = __webpack_require__(/*! sort-keys */ "./node_modules/sort-keys/index.js");
        var objectAssign = __webpack_require__(/*! object-assign */ "./node_modules/object-assign/index.js");

        var DEFAULT_PORTS = {
            'http:': 80,
            'https:': 443,
            'ftp:': 21
        };

// protocols that always contain a `//`` bit
        var slashedProtocol = {
            'http': true,
            'https': true,
            'ftp': true,
            'gopher': true,
            'file': true,
            'http:': true,
            'https:': true,
            'ftp:': true,
            'gopher:': true,
            'file:': true
        };

        function testParameter(name, filters) {
            return filters.some(function (filter) {
                return filter instanceof RegExp ? filter.test(name) : filter === name;
            });
        }

        module.exports = function (str, opts) {
            opts = objectAssign({
                normalizeProtocol: true,
                normalizeHttps: false,
                stripFragment: true,
                stripWWW: true,
                removeQueryParameters: [/^utm_\w+/i],
                removeTrailingSlash: true,
                removeDirectoryIndex: false
            }, opts);

            if (typeof str !== 'string') {
                throw new TypeError('Expected a string');
            }

            var hasRelativeProtocol = str.indexOf('//') === 0;

// prepend protocol
            str = prependHttp(str.trim()).replace(/^\/\//, 'http://');

            var urlObj = url.parse(str);

            if (opts.normalizeHttps && urlObj.protocol === 'https:') {
                urlObj.protocol = 'http:';
            }

            if (!urlObj.hostname && !urlObj.pathname) {
                throw new Error('Invalid URL');
            }

// prevent these from being used by `url.format`
            delete urlObj.host;
            delete urlObj.query;

// remove fragment
            if (opts.stripFragment) {
                delete urlObj.hash;
            }

// remove default port
            var port = DEFAULT_PORTS[urlObj.protocol];
            if (Number(urlObj.port) === port) {
                delete urlObj.port;
            }

// remove duplicate slashes
            if (urlObj.pathname) {
                urlObj.pathname = urlObj.pathname.replace(/\/{2,}/g, '/');
            }

// decode URI octets
            if (urlObj.pathname) {
                urlObj.pathname = decodeURI(urlObj.pathname);
            }

// remove directory index
            if (opts.removeDirectoryIndex === true) {
                opts.removeDirectoryIndex = [/^index\.[a-z]+$/];
            }

            if (Array.isArray(opts.removeDirectoryIndex) && opts.removeDirectoryIndex.length) {
                var pathComponents = urlObj.pathname.split('/');
                var lastComponent = pathComponents[pathComponents.length - 1];

                if (testParameter(lastComponent, opts.removeDirectoryIndex)) {
                    pathComponents = pathComponents.slice(0, pathComponents.length - 1);
                    urlObj.pathname = pathComponents.slice(1).join('/') + '/';
                }
            }

// resolve relative paths, but only for slashed protocols
            if (slashedProtocol[urlObj.protocol]) {
                var domain = urlObj.protocol + '//' + urlObj.hostname;
                var relative = url.resolve(domain, urlObj.pathname);
                urlObj.pathname = relative.replace(domain, '');
            }

            if (urlObj.hostname) {
// IDN to Unicode
                urlObj.hostname = punycode.toUnicode(urlObj.hostname).toLowerCase();

// remove trailing dot
                urlObj.hostname = urlObj.hostname.replace(/\.$/, '');

// remove `www.`
                if (opts.stripWWW) {
                    urlObj.hostname = urlObj.hostname.replace(/^www\./, '');
                }
            }

// remove URL with empty query string
            if (urlObj.search === '?') {
                delete urlObj.search;
            }

            var queryParameters = queryString.parse(urlObj.search);

// remove query unwanted parameters
            if (Array.isArray(opts.removeQueryParameters)) {
                for (var key in queryParameters) {
                    if (testParameter(key, opts.removeQueryParameters)) {
                        delete queryParameters[key];
                    }
                }
            }

// sort query parameters
            urlObj.search = queryString.stringify(sortKeys(queryParameters));

// decode query parameters
            urlObj.search = decodeURIComponent(urlObj.search);

// take advantage of many of the Node `url` normalizations
            str = url.format(urlObj);

// remove ending `/`
            if (opts.removeTrailingSlash || urlObj.pathname === '/') {
                str = str.replace(/\/$/, '');
            }

// restore relative protocol, if applicable
            if (hasRelativeProtocol && !opts.normalizeProtocol) {
                str = str.replace(/^http:\/\//, '//');
            }

            return str;
        };


        /***/ }),

    /***/ "./node_modules/object-assign/index.js":
    /*!*********************************************!*\
  !*** ./node_modules/object-assign/index.js ***!
  \*********************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {

        "use strict";
        /*
object-assign
(c) Sindre Sorhus
@license MIT
*/


        /* eslint-disable no-unused-vars */
        var getOwnPropertySymbols = Object.getOwnPropertySymbols;
        var hasOwnProperty = Object.prototype.hasOwnProperty;
        var propIsEnumerable = Object.prototype.propertyIsEnumerable;

        function toObject(val) {
            if (val === null || val === undefined) {
                throw new TypeError('Object.assign cannot be called with null or undefined');
            }

            return Object(val);
        }

        function shouldUseNative() {
            try {
                if (!Object.assign) {
                    return false;
                }

// Detect buggy property enumeration order in older V8 versions.

// https://bugs.chromium.org/p/v8/issues/detail?id=4118
                var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
                test1[5] = 'de';
                if (Object.getOwnPropertyNames(test1)[0] === '5') {
                    return false;
                }

// https://bugs.chromium.org/p/v8/issues/detail?id=3056
                var test2 = {};
                for (var i = 0; i < 10; i++) {
                    test2['_' + String.fromCharCode(i)] = i;
                }
                var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
                    return test2[n];
                });
                if (order2.join('') !== '0123456789') {
                    return false;
                }

// https://bugs.chromium.org/p/v8/issues/detail?id=3056
                var test3 = {};
                'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
                    test3[letter] = letter;
                });
                if (Object.keys(Object.assign({}, test3)).join('') !==
                    'abcdefghijklmnopqrst') {
                    return false;
                }

                return true;
            } catch (err) {
// We don't expect any of the above to throw, but better to be safe.
                return false;
            }
        }

        module.exports = shouldUseNative() ? Object.assign : function (target, source) {
            var from;
            var to = toObject(target);
            var symbols;

            for (var s = 1; s < arguments.length; s++) {
                from = Object(arguments[s]);

                for (var key in from) {
                    if (hasOwnProperty.call(from, key)) {
                        to[key] = from[key];
                    }
                }

                if (getOwnPropertySymbols) {
                    symbols = getOwnPropertySymbols(from);
                    for (var i = 0; i < symbols.length; i++) {
                        if (propIsEnumerable.call(from, symbols[i])) {
                            to[symbols[i]] = from[symbols[i]];
                        }
                    }
                }
            }

            return to;
        };


        /***/ }),

    /***/ "./node_modules/prepend-http/index.js":
    /*!********************************************!*\
  !*** ./node_modules/prepend-http/index.js ***!
  \********************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {

        "use strict";

        module.exports = function (url) {
            if (typeof url !== 'string') {
                throw new TypeError('Expected a string, got ' + typeof url);
            }

            url = url.trim();

            if (/^\.*\/|^(?!localhost)\w+:/.test(url)) {
                return url;
            }

            return url.replace(/^(?!(?:\w+:)?\/\/)/, 'http://');
        };


        /***/ }),

    /***/ "./node_modules/punycode/punycode.js":
    /*!*******************************************!*\
  !*** ./node_modules/punycode/punycode.js ***!
  \*******************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {

        /* WEBPACK VAR INJECTION */(function(module, global) {var __WEBPACK_AMD_DEFINE_RESULT__;/*! https://mths.be/punycode v1.4.1 by @mathias */
            ;(function(root) {

                /** Detect free variables */
                var freeExports = typeof exports == 'object' && exports &&
                    !exports.nodeType && exports;
                var freeModule = typeof module == 'object' && module &&
                    !module.nodeType && module;
                var freeGlobal = typeof global == 'object' && global;
                if (
                    freeGlobal.global === freeGlobal ||
                    freeGlobal.window === freeGlobal ||
                    freeGlobal.self === freeGlobal
                ) {
                    root = freeGlobal;
                }

                /**
                 * The `punycode` object.
                 * @name punycode
                 * @type Object
                 */
                var punycode,

                    /** Highest positive signed 32-bit float value */
                    maxInt = 2147483647, // aka. 0x7FFFFFFF or 2^31-1

                    /** Bootstring parameters */
                    base = 36,
                    tMin = 1,
                    tMax = 26,
                    skew = 38,
                    damp = 700,
                    initialBias = 72,
                    initialN = 128, // 0x80
                    delimiter = '-', // '\x2D'

                    /** Regular expressions */
                    regexPunycode = /^xn--/,
                    regexNonASCII = /[^\x20-\x7E]/, // unprintable ASCII chars + non-ASCII chars
                    regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g, // RFC 3490 separators

                    /** Error messages */
                    errors = {
                        'overflow': 'Overflow: input needs wider integers to process',
                        'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
                        'invalid-input': 'Invalid input'
                    },

                    /** Convenience shortcuts */
                    baseMinusTMin = base - tMin,
                    floor = Math.floor,
                    stringFromCharCode = String.fromCharCode,

                    /** Temporary variable */
                    key;

                /*--------------------------------------------------------------------------*/

                /**
                 * A generic error utility function.
                 * @private
                 * @param {String} type The error type.
                 * @returns {Error} Throws a `RangeError` with the applicable error message.
                 */
                function error(type) {
                    throw new RangeError(errors[type]);
                }

                /**
                 * A generic `Array#map` utility function.
                 * @private
                 * @param {Array} array The array to iterate over.
                 * @param {Function} callback The function that gets called for every array
                 * item.
                 * @returns {Array} A new array of values returned by the callback function.
                 */
                function map(array, fn) {
                    var length = array.length;
                    var result = [];
                    while (length--) {
                        result[length] = fn(array[length]);
                    }
                    return result;
                }

                /**
                 * A simple `Array#map`-like wrapper to work with domain name strings or email
                 * addresses.
                 * @private
                 * @param {String} domain The domain name or email address.
                 * @param {Function} callback The function that gets called for every
                 * character.
                 * @returns {Array} A new string of characters returned by the callback
                 * function.
                 */
                function mapDomain(string, fn) {
                    var parts = string.split('@');
                    var result = '';
                    if (parts.length > 1) {
// In email addresses, only the domain name should be punycoded. Leave
// the local part (i.e. everything up to `@`) intact.
                        result = parts[0] + '@';
                        string = parts[1];
                    }
// Avoid `split(regex)` for IE8 compatibility. See #17.
                    string = string.replace(regexSeparators, '\x2E');
                    var labels = string.split('.');
                    var encoded = map(labels, fn).join('.');
                    return result + encoded;
                }

                /**
                 * Creates an array containing the numeric code points of each Unicode
                 * character in the string. While JavaScript uses UCS-2 internally,
                 * this function will convert a pair of surrogate halves (each of which
                 * UCS-2 exposes as separate characters) into a single code point,
                 * matching UTF-16.
                 * @see `punycode.ucs2.encode`
                 * @see <https://mathiasbynens.be/notes/javascript-encoding>
                 * @memberOf punycode.ucs2
                 * @name decode
                 * @param {String} string The Unicode input string (UCS-2).
                 * @returns {Array} The new array of code points.
                 */
                function ucs2decode(string) {
                    var output = [],
                        counter = 0,
                        length = string.length,
                        value,
                        extra;
                    while (counter < length) {
                        value = string.charCodeAt(counter++);
                        if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
// high surrogate, and there is a next character
                            extra = string.charCodeAt(counter++);
                            if ((extra & 0xFC00) == 0xDC00) { // low surrogate
                                output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
                            } else {
                                // unmatched surrogate; only append this code unit, in case the next
                                // code unit is the high surrogate of a surrogate pair
                                output.push(value);
                                counter--;
                            }
                        } else {
                            output.push(value);
                        }
                    }
                    return output;
                }

                /**
                 * Creates a string based on an array of numeric code points.
                 * @see `punycode.ucs2.decode`
                 * @memberOf punycode.ucs2
                 * @name encode
                 * @param {Array} codePoints The array of numeric code points.
                 * @returns {String} The new Unicode string (UCS-2).
                 */
                function ucs2encode(array) {
                    return map(array, function(value) {
                        var output = '';
                        if (value > 0xFFFF) {
                            value -= 0x10000;
                            output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
                            value = 0xDC00 | value & 0x3FF;
                        }
                        output += stringFromCharCode(value);
                        return output;
                    }).join('');
                }

                /**
                 * Converts a basic code point into a digit/integer.
                 * @see `digitToBasic()`
                 * @private
                 * @param {Number} codePoint The basic numeric code point value.
                 * @returns {Number} The numeric value of a basic code point (for use in
                 * representing integers) in the range `0` to `base - 1`, or `base` if
                 * the code point does not represent a value.
                 */
                function basicToDigit(codePoint) {
                    if (codePoint - 48 < 10) {
                        return codePoint - 22;
                    }
                    if (codePoint - 65 < 26) {
                        return codePoint - 65;
                    }
                    if (codePoint - 97 < 26) {
                        return codePoint - 97;
                    }
                    return base;
                }

                /**
                 * Converts a digit/integer into a basic code point.
                 * @see `basicToDigit()`
                 * @private
                 * @param {Number} digit The numeric value of a basic code point.
                 * @returns {Number} The basic code point whose value (when used for
                 * representing integers) is `digit`, which needs to be in the range
                 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
                 * used; else, the lowercase form is used. The behavior is undefined
                 * if `flag` is non-zero and `digit` has no uppercase form.
                 */
                function digitToBasic(digit, flag) {
//  0..25 map to ASCII a..z or A..Z
// 26..35 map to ASCII 0..9
                    return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
                }

                /**
                 * Bias adaptation function as per section 3.4 of RFC 3492.
                 * https://tools.ietf.org/html/rfc3492#section-3.4
                 * @private
                 */
                function adapt(delta, numPoints, firstTime) {
                    var k = 0;
                    delta = firstTime ? floor(delta / damp) : delta >> 1;
                    delta += floor(delta / numPoints);
                    for (/* no initialization */; delta > baseMinusTMin * tMax >> 1; k += base) {
                        delta = floor(delta / baseMinusTMin);
                    }
                    return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
                }

                /**
                 * Converts a Punycode string of ASCII-only symbols to a string of Unicode
                 * symbols.
                 * @memberOf punycode
                 * @param {String} input The Punycode string of ASCII-only symbols.
                 * @returns {String} The resulting string of Unicode symbols.
                 */
                function decode(input) {
// Don't use UCS-2
                    var output = [],
                        inputLength = input.length,
                        out,
                        i = 0,
                        n = initialN,
                        bias = initialBias,
                        basic,
                        j,
                        index,
                        oldi,
                        w,
                        k,
                        digit,
                        t,
                        /** Cached calculation results */
                        baseMinusT;

// Handle the basic code points: let `basic` be the number of input code
// points before the last delimiter, or `0` if there is none, then copy
// the first basic code points to the output.

                    basic = input.lastIndexOf(delimiter);
                    if (basic < 0) {
                        basic = 0;
                    }

                    for (j = 0; j < basic; ++j) {
// if it's not a basic code point
                        if (input.charCodeAt(j) >= 0x80) {
                            error('not-basic');
                        }
                        output.push(input.charCodeAt(j));
                    }

// Main decoding loop: start just after the last delimiter if any basic code
// points were copied; start at the beginning otherwise.

                    for (index = basic > 0 ? basic + 1 : 0; index < inputLength; /* no final expression */) {

// `index` is the index of the next character to be consumed.
// Decode a generalized variable-length integer into `delta`,
// which gets added to `i`. The overflow checking is easier
// if we increase `i` as we go, then subtract off its starting
// value at the end to obtain `delta`.
                        for (oldi = i, w = 1, k = base; /* no condition */; k += base) {

                            if (index >= inputLength) {
                                error('invalid-input');
                            }

                            digit = basicToDigit(input.charCodeAt(index++));

                            if (digit >= base || digit > floor((maxInt - i) / w)) {
                                error('overflow');
                            }

                            i += digit * w;
                            t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);

                            if (digit < t) {
                                break;
                            }

                            baseMinusT = base - t;
                            if (w > floor(maxInt / baseMinusT)) {
                                error('overflow');
                            }

                            w *= baseMinusT;

                        }

                        out = output.length + 1;
                        bias = adapt(i - oldi, out, oldi == 0);

// `i` was supposed to wrap around from `out` to `0`,
// incrementing `n` each time, so we'll fix that now:
                        if (floor(i / out) > maxInt - n) {
                            error('overflow');
                        }

                        n += floor(i / out);
                        i %= out;

// Insert `n` at position `i` of the output
                        output.splice(i++, 0, n);

                    }

                    return ucs2encode(output);
                }

                /**
                 * Converts a string of Unicode symbols (e.g. a domain name label) to a
                 * Punycode string of ASCII-only symbols.
                 * @memberOf punycode
                 * @param {String} input The string of Unicode symbols.
                 * @returns {String} The resulting Punycode string of ASCII-only symbols.
                 */
                function encode(input) {
                    var n,
                        delta,
                        handledCPCount,
                        basicLength,
                        bias,
                        j,
                        m,
                        q,
                        k,
                        t,
                        currentValue,
                        output = [],
                        /** `inputLength` will hold the number of code points in `input`. */
                        inputLength,
                        /** Cached calculation results */
                        handledCPCountPlusOne,
                        baseMinusT,
                        qMinusT;

// Convert the input in UCS-2 to Unicode
                    input = ucs2decode(input);

// Cache the length
                    inputLength = input.length;

// Initialize the state
                    n = initialN;
                    delta = 0;
                    bias = initialBias;

// Handle the basic code points
                    for (j = 0; j < inputLength; ++j) {
                        currentValue = input[j];
                        if (currentValue < 0x80) {
                            output.push(stringFromCharCode(currentValue));
                        }
                    }

                    handledCPCount = basicLength = output.length;

// `handledCPCount` is the number of code points that have been handled;
// `basicLength` is the number of basic code points.

// Finish the basic string - if it is not empty - with a delimiter
                    if (basicLength) {
                        output.push(delimiter);
                    }

// Main encoding loop:
                    while (handledCPCount < inputLength) {

// All non-basic code points < n have been handled already. Find the next
// larger one:
                        for (m = maxInt, j = 0; j < inputLength; ++j) {
                            currentValue = input[j];
                            if (currentValue >= n && currentValue < m) {
                                m = currentValue;
                            }
                        }

// Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
// but guard against overflow
                        handledCPCountPlusOne = handledCPCount + 1;
                        if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
                            error('overflow');
                        }

                        delta += (m - n) * handledCPCountPlusOne;
                        n = m;

                        for (j = 0; j < inputLength; ++j) {
                            currentValue = input[j];

                            if (currentValue < n && ++delta > maxInt) {
                                error('overflow');
                            }

                            if (currentValue == n) {
// Represent delta as a generalized variable-length integer
                                for (q = delta, k = base; /* no condition */; k += base) {
                                    t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
                                    if (q < t) {
                                        break;
                                    }
                                    qMinusT = q - t;
                                    baseMinusT = base - t;
                                    output.push(
                                        stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
                                    );
                                    q = floor(qMinusT / baseMinusT);
                                }

                                output.push(stringFromCharCode(digitToBasic(q, 0)));
                                bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
                                delta = 0;
                                ++handledCPCount;
                            }
                        }

                        ++delta;
                        ++n;

                    }
                    return output.join('');
                }

                /**
                 * Converts a Punycode string representing a domain name or an email address
                 * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
                 * it doesn't matter if you call it on a string that has already been
                 * converted to Unicode.
                 * @memberOf punycode
                 * @param {String} input The Punycoded domain name or email address to
                 * convert to Unicode.
                 * @returns {String} The Unicode representation of the given Punycode
                 * string.
                 */
                function toUnicode(input) {
                    return mapDomain(input, function(string) {
                        return regexPunycode.test(string)
                            ? decode(string.slice(4).toLowerCase())
                            : string;
                    });
                }

                /**
                 * Converts a Unicode string representing a domain name or an email address to
                 * Punycode. Only the non-ASCII parts of the domain name will be converted,
                 * i.e. it doesn't matter if you call it with a domain that's already in
                 * ASCII.
                 * @memberOf punycode
                 * @param {String} input The domain name or email address to convert, as a
                 * Unicode string.
                 * @returns {String} The Punycode representation of the given domain name or
                 * email address.
                 */
                function toASCII(input) {
                    return mapDomain(input, function(string) {
                        return regexNonASCII.test(string)
                            ? 'xn--' + encode(string)
                            : string;
                    });
                }

                /*--------------------------------------------------------------------------*/

                /** Define the public API */
                punycode = {
                    /**
                     * A string representing the current Punycode.js version number.
                     * @memberOf punycode
                     * @type String
                     */
                    'version': '1.4.1',
                    /**
                     * An object of methods to convert from JavaScript's internal character
                     * representation (UCS-2) to Unicode code points, and back.
                     * @see <https://mathiasbynens.be/notes/javascript-encoding>
                     * @memberOf punycode
                     * @type Object
                     */
                    'ucs2': {
                        'decode': ucs2decode,
                        'encode': ucs2encode
                    },
                    'decode': decode,
                    'encode': encode,
                    'toASCII': toASCII,
                    'toUnicode': toUnicode
                };

                /** Expose `punycode` */
// Some AMD build optimizers, like r.js, check for specific condition patterns
// like the following:
                if (
                    true
                ) {
                    !(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {
                        return punycode;
                    }).call(exports, __webpack_require__, exports, module),
                    __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
                } else {}

            }(this));

            /* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module), __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

        /***/ }),

    /***/ "./node_modules/query-string/index.js":
    /*!********************************************!*\
  !*** ./node_modules/query-string/index.js ***!
  \********************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {

        "use strict";

        var strictUriEncode = __webpack_require__(/*! strict-uri-encode */ "./node_modules/strict-uri-encode/index.js");
        var objectAssign = __webpack_require__(/*! object-assign */ "./node_modules/object-assign/index.js");

        function encoderForArrayFormat(opts) {
            switch (opts.arrayFormat) {
                case 'index':
                    return function (key, value, index) {
                        return value === null ? [
                            encode(key, opts),
                            '[',
                            index,
                            ']'
                        ].join('') : [
                            encode(key, opts),
                            '[',
                            encode(index, opts),
                            ']=',
                            encode(value, opts)
                        ].join('');
                    };

                case 'bracket':
                    return function (key, value) {
                        return value === null ? encode(key, opts) : [
                            encode(key, opts),
                            '[]=',
                            encode(value, opts)
                        ].join('');
                    };

                default:
                    return function (key, value) {
                        return value === null ? encode(key, opts) : [
                            encode(key, opts),
                            '=',
                            encode(value, opts)
                        ].join('');
                    };
            }
        }

        function parserForArrayFormat(opts) {
            var result;

            switch (opts.arrayFormat) {
                case 'index':
                    return function (key, value, accumulator) {
                        result = /\[(\d*)]$/.exec(key);

                        key = key.replace(/\[\d*]$/, '');

                        if (!result) {
                            accumulator[key] = value;
                            return;
                        }

                        if (accumulator[key] === undefined) {
                            accumulator[key] = {};
                        }

                        accumulator[key][result[1]] = value;
                    };

                case 'bracket':
                    return function (key, value, accumulator) {
                        result = /(\[])$/.exec(key);

                        key = key.replace(/\[]$/, '');

                        if (!result || accumulator[key] === undefined) {
                            accumulator[key] = value;
                            return;
                        }

                        accumulator[key] = [].concat(accumulator[key], value);
                    };

                default:
                    return function (key, value, accumulator) {
                        if (accumulator[key] === undefined) {
                            accumulator[key] = value;
                            return;
                        }

                        accumulator[key] = [].concat(accumulator[key], value);
                    };
            }
        }

        function encode(value, opts) {
            if (opts.encode) {
                return opts.strict ? strictUriEncode(value) : encodeURIComponent(value);
            }

            return value;
        }

        function keysSorter(input) {
            if (Array.isArray(input)) {
                return input.sort();
            } else if (typeof input === 'object') {
                return keysSorter(Object.keys(input)).sort(function (a, b) {
                    return Number(a) - Number(b);
                }).map(function (key) {
                    return input[key];
                });
            }

            return input;
        }

        exports.extract = function (str) {
            return str.split('?')[1] || '';
        };

        exports.parse = function (str, opts) {
            opts = objectAssign({arrayFormat: 'none'}, opts);

            var formatter = parserForArrayFormat(opts);

// Create an object with no prototype
// https://github.com/sindresorhus/query-string/issues/47
            var ret = Object.create(null);

            if (typeof str !== 'string') {
                return ret;
            }

            str = str.trim().replace(/^(\?|#|&)/, '');

            if (!str) {
                return ret;
            }

            str.split('&').forEach(function (param) {
                var parts = param.replace(/\+/g, ' ').split('=');
// Firefox (pre 40) decodes `%3D` to `=`
// https://github.com/sindresorhus/query-string/pull/37
                var key = parts.shift();
                var val = parts.length > 0 ? parts.join('=') : undefined;

// missing `=` should be `null`:
// http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
                val = val === undefined ? null : decodeURIComponent(val);

                formatter(decodeURIComponent(key), val, ret);
            });

            return Object.keys(ret).sort().reduce(function (result, key) {
                var val = ret[key];
                if (Boolean(val) && typeof val === 'object' && !Array.isArray(val)) {
// Sort object keys, not values
                    result[key] = keysSorter(val);
                } else {
                    result[key] = val;
                }

                return result;
            }, Object.create(null));
        };

        exports.stringify = function (obj, opts) {
            var defaults = {
                encode: true,
                strict: true,
                arrayFormat: 'none'
            };

            opts = objectAssign(defaults, opts);

            var formatter = encoderForArrayFormat(opts);

            return obj ? Object.keys(obj).sort().map(function (key) {
                var val = obj[key];

                if (val === undefined) {
                    return '';
                }

                if (val === null) {
                    return encode(key, opts);
                }

                if (Array.isArray(val)) {
                    var result = [];

                    val.slice().forEach(function (val2) {
                        if (val2 === undefined) {
                            return;
                        }

                        result.push(formatter(key, val2, result.length));
                    });

                    return result.join('&');
                }

                return encode(key, opts) + '=' + encode(val, opts);
            }).filter(function (x) {
                return x.length > 0;
            }).join('&') : '';
        };


        /***/ }),

    /***/ "./node_modules/querystring-es3/decode.js":
    /*!************************************************!*\
  !*** ./node_modules/querystring-es3/decode.js ***!
  \************************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {

        "use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



// If obj.hasOwnProperty has been overridden, then calling
// obj.hasOwnProperty(prop) will break.
// See: https://github.com/joyent/node/issues/1707
        function hasOwnProperty(obj, prop) {
            return Object.prototype.hasOwnProperty.call(obj, prop);
        }

        module.exports = function(qs, sep, eq, options) {
            sep = sep || '&';
            eq = eq || '=';
            var obj = {};

            if (typeof qs !== 'string' || qs.length === 0) {
                return obj;
            }

            var regexp = /\+/g;
            qs = qs.split(sep);

            var maxKeys = 1000;
            if (options && typeof options.maxKeys === 'number') {
                maxKeys = options.maxKeys;
            }

            var len = qs.length;
// maxKeys <= 0 means that we should not limit keys count
            if (maxKeys > 0 && len > maxKeys) {
                len = maxKeys;
            }

            for (var i = 0; i < len; ++i) {
                var x = qs[i].replace(regexp, '%20'),
                    idx = x.indexOf(eq),
                    kstr, vstr, k, v;

                if (idx >= 0) {
                    kstr = x.substr(0, idx);
                    vstr = x.substr(idx + 1);
                } else {
                    kstr = x;
                    vstr = '';
                }

                k = decodeURIComponent(kstr);
                v = decodeURIComponent(vstr);

                if (!hasOwnProperty(obj, k)) {
                    obj[k] = v;
                } else if (isArray(obj[k])) {
                    obj[k].push(v);
                } else {
                    obj[k] = [obj[k], v];
                }
            }

            return obj;
        };

        var isArray = Array.isArray || function (xs) {
            return Object.prototype.toString.call(xs) === '[object Array]';
        };


        /***/ }),

    /***/ "./node_modules/querystring-es3/encode.js":
    /*!************************************************!*\
  !*** ./node_modules/querystring-es3/encode.js ***!
  \************************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {

        "use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



        var stringifyPrimitive = function(v) {
            switch (typeof v) {
                case 'string':
                    return v;

                case 'boolean':
                    return v ? 'true' : 'false';

                case 'number':
                    return isFinite(v) ? v : '';

                default:
                    return '';
            }
        };

        module.exports = function(obj, sep, eq, name) {
            sep = sep || '&';
            eq = eq || '=';
            if (obj === null) {
                obj = undefined;
            }

            if (typeof obj === 'object') {
                return map(objectKeys(obj), function(k) {
                    var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
                    if (isArray(obj[k])) {
                        return map(obj[k], function(v) {
                            return ks + encodeURIComponent(stringifyPrimitive(v));
                        }).join(sep);
                    } else {
                        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
                    }
                }).join(sep);

            }

            if (!name) return '';
            return encodeURIComponent(stringifyPrimitive(name)) + eq +
                encodeURIComponent(stringifyPrimitive(obj));
        };

        var isArray = Array.isArray || function (xs) {
            return Object.prototype.toString.call(xs) === '[object Array]';
        };

        function map (xs, f) {
            if (xs.map) return xs.map(f);
            var res = [];
            for (var i = 0; i < xs.length; i++) {
                res.push(f(xs[i], i));
            }
            return res;
        }

        var objectKeys = Object.keys || function (obj) {
            var res = [];
            for (var key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key)) res.push(key);
            }
            return res;
        };


        /***/ }),

    /***/ "./node_modules/querystring-es3/index.js":
    /*!***********************************************!*\
  !*** ./node_modules/querystring-es3/index.js ***!
  \***********************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {

        "use strict";


        exports.decode = exports.parse = __webpack_require__(/*! ./decode */ "./node_modules/querystring-es3/decode.js");
        exports.encode = exports.stringify = __webpack_require__(/*! ./encode */ "./node_modules/querystring-es3/encode.js");


        /***/ }),

    /***/ "./node_modules/sort-keys/index.js":
    /*!*****************************************!*\
  !*** ./node_modules/sort-keys/index.js ***!
  \*****************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {

        "use strict";

        var isPlainObj = __webpack_require__(/*! is-plain-obj */ "./node_modules/is-plain-obj/index.js");

        module.exports = function (obj, opts) {
            if (!isPlainObj(obj)) {
                throw new TypeError('Expected a plain object');
            }

            opts = opts || {};

// DEPRECATED
            if (typeof opts === 'function') {
                opts = {compare: opts};
            }

            var deep = opts.deep;
            var seenInput = [];
            var seenOutput = [];

            var sortKeys = function (x) {
                var seenIndex = seenInput.indexOf(x);

                if (seenIndex !== -1) {
                    return seenOutput[seenIndex];
                }

                var ret = {};
                var keys = Object.keys(x).sort(opts.compare);

                seenInput.push(x);
                seenOutput.push(ret);

                for (var i = 0; i < keys.length; i++) {
                    var key = keys[i];
                    var val = x[key];

                    ret[key] = deep && isPlainObj(val) ? sortKeys(val) : val;
                }

                return ret;
            };

            return sortKeys(obj);
        };


        /***/ }),

    /***/ "./node_modules/strict-uri-encode/index.js":
    /*!*************************************************!*\
  !*** ./node_modules/strict-uri-encode/index.js ***!
  \*************************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {

        "use strict";

        module.exports = function (str) {
            return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
                return '%' + c.charCodeAt(0).toString(16).toUpperCase();
            });
        };


        /***/ }),

    /***/ "./node_modules/url/url.js":
    /*!*********************************!*\
  !*** ./node_modules/url/url.js ***!
  \*********************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {

        "use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



        var punycode = __webpack_require__(/*! punycode */ "./node_modules/punycode/punycode.js");
        var util = __webpack_require__(/*! ./util */ "./node_modules/url/util.js");

        exports.parse = urlParse;
        exports.resolve = urlResolve;
        exports.resolveObject = urlResolveObject;
        exports.format = urlFormat;

        exports.Url = Url;

        function Url() {
            this.protocol = null;
            this.slashes = null;
            this.auth = null;
            this.host = null;
            this.port = null;
            this.hostname = null;
            this.hash = null;
            this.search = null;
            this.query = null;
            this.pathname = null;
            this.path = null;
            this.href = null;
        }

// Reference: RFC 3986, RFC 1808, RFC 2396

// define these here so at least they only have to be
// compiled once on the first module load.
        var protocolPattern = /^([a-z0-9.+-]+:)/i,
            portPattern = /:[0-9]*$/,

// Special case for a simple path URL
            simplePathPattern = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,

// RFC 2396: characters reserved for delimiting URLs.
// We actually just auto-escape these.
            delims = ['<', '>', '"', '`', ' ', '\r', '\n', '\t'],

// RFC 2396: characters not allowed for various reasons.
            unwise = ['{', '}', '|', '\\', '^', '`'].concat(delims),

// Allowed by RFCs, but cause of XSS attacks.  Always escape these.
            autoEscape = ['\''].concat(unwise),
// Characters that are never ever allowed in a hostname.
// Note that any invalid chars are also handled, but these
// are the ones that are *expected* to be seen, so we fast-path
// them.
            nonHostChars = ['%', '/', '?', ';', '#'].concat(autoEscape),
            hostEndingChars = ['/', '?', '#'],
            hostnameMaxLen = 255,
            hostnamePartPattern = /^[+a-z0-9A-Z_-]{0,63}$/,
            hostnamePartStart = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,
// protocols that can allow "unsafe" and "unwise" chars.
            unsafeProtocol = {
                'javascript': true,
                'javascript:': true
            },
// protocols that never have a hostname.
            hostlessProtocol = {
                'javascript': true,
                'javascript:': true
            },
// protocols that always contain a // bit.
            slashedProtocol = {
                'http': true,
                'https': true,
                'ftp': true,
                'gopher': true,
                'file': true,
                'http:': true,
                'https:': true,
                'ftp:': true,
                'gopher:': true,
                'file:': true
            },
            querystring = __webpack_require__(/*! querystring */ "./node_modules/querystring-es3/index.js");

        function urlParse(url, parseQueryString, slashesDenoteHost) {
            if (url && util.isObject(url) && url instanceof Url) return url;

            var u = new Url;
            u.parse(url, parseQueryString, slashesDenoteHost);
            return u;
        }

        Url.prototype.parse = function(url, parseQueryString, slashesDenoteHost) {
            if (!util.isString(url)) {
                throw new TypeError("Parameter 'url' must be a string, not " + typeof url);
            }

// Copy chrome, IE, opera backslash-handling behavior.
// Back slashes before the query string get converted to forward slashes
// See: https://code.google.com/p/chromium/issues/detail?id=25916
            var queryIndex = url.indexOf('?'),
                splitter =
                    (queryIndex !== -1 && queryIndex < url.indexOf('#')) ? '?' : '#',
                uSplit = url.split(splitter),
                slashRegex = /\\/g;
            uSplit[0] = uSplit[0].replace(slashRegex, '/');
            url = uSplit.join(splitter);

            var rest = url;

// trim before proceeding.
// This is to support parse stuff like "  http://foo.com  \n"
            rest = rest.trim();

            if (!slashesDenoteHost && url.split('#').length === 1) {
// Try fast path regexp
                var simplePath = simplePathPattern.exec(rest);
                if (simplePath) {
                    this.path = rest;
                    this.href = rest;
                    this.pathname = simplePath[1];
                    if (simplePath[2]) {
                        this.search = simplePath[2];
                        if (parseQueryString) {
                            this.query = querystring.parse(this.search.substr(1));
                        } else {
                            this.query = this.search.substr(1);
                        }
                    } else if (parseQueryString) {
                        this.search = '';
                        this.query = {};
                    }
                    return this;
                }
            }

            var proto = protocolPattern.exec(rest);
            if (proto) {
                proto = proto[0];
                var lowerProto = proto.toLowerCase();
                this.protocol = lowerProto;
                rest = rest.substr(proto.length);
            }

// figure out if it's got a host
// user@server is *always* interpreted as a hostname, and url
// resolution will treat //foo/bar as host=foo,path=bar because that's
// how the browser resolves relative URLs.
            if (slashesDenoteHost || proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
                var slashes = rest.substr(0, 2) === '//';
                if (slashes && !(proto && hostlessProtocol[proto])) {
                    rest = rest.substr(2);
                    this.slashes = true;
                }
            }

            if (!hostlessProtocol[proto] &&
                (slashes || (proto && !slashedProtocol[proto]))) {

// there's a hostname.
// the first instance of /, ?, ;, or # ends the host.
//
// If there is an @ in the hostname, then non-host chars *are* allowed
// to the left of the last @ sign, unless some host-ending character
// comes *before* the @-sign.
// URLs are obnoxious.
//
// ex:
// http://a@b@c/ => user:a@b host:c
// http://a@b?@c => user:a host:c path:/?@c

// v0.12 TODO(isaacs): This is not quite how Chrome does things.
// Review our test case against browsers more comprehensively.

// find the first instance of any hostEndingChars
                var hostEnd = -1;
                for (var i = 0; i < hostEndingChars.length; i++) {
                    var hec = rest.indexOf(hostEndingChars[i]);
                    if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
                        hostEnd = hec;
                }

// at this point, either we have an explicit point where the
// auth portion cannot go past, or the last @ char is the decider.
                var auth, atSign;
                if (hostEnd === -1) {
// atSign can be anywhere.
                    atSign = rest.lastIndexOf('@');
                } else {
                    // atSign must be in auth portion.
                    // http://a@b/c@d => host:b auth:a path:/c@d
                    atSign = rest.lastIndexOf('@', hostEnd);
                }

// Now we have a portion which is definitely the auth.
// Pull that off.
                if (atSign !== -1) {
                    auth = rest.slice(0, atSign);
                    rest = rest.slice(atSign + 1);
                    this.auth = decodeURIComponent(auth);
                }

// the host is the remaining to the left of the first non-host char
                hostEnd = -1;
                for (var i = 0; i < nonHostChars.length; i++) {
                    var hec = rest.indexOf(nonHostChars[i]);
                    if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
                        hostEnd = hec;
                }
// if we still have not hit it, then the entire thing is a host.
                if (hostEnd === -1)
                    hostEnd = rest.length;

                this.host = rest.slice(0, hostEnd);
                rest = rest.slice(hostEnd);

// pull out port.
                this.parseHost();

// we've indicated that there is a hostname,
// so even if it's empty, it has to be present.
                this.hostname = this.hostname || '';

// if hostname begins with [ and ends with ]
// assume that it's an IPv6 address.
                var ipv6Hostname = this.hostname[0] === '[' &&
                    this.hostname[this.hostname.length - 1] === ']';

// validate a little.
                if (!ipv6Hostname) {
                    var hostparts = this.hostname.split(/\./);
                    for (var i = 0, l = hostparts.length; i < l; i++) {
                        var part = hostparts[i];
                        if (!part) continue;
                        if (!part.match(hostnamePartPattern)) {
                            var newpart = '';
                            for (var j = 0, k = part.length; j < k; j++) {
                                if (part.charCodeAt(j) > 127) {
// we replace non-ASCII char with a temporary placeholder
// we need this to make sure size of hostname is not
// broken by replacing non-ASCII by nothing
                                    newpart += 'x';
                                } else {
                                    newpart += part[j];
                                }
                            }
// we test again with ASCII char only
                            if (!newpart.match(hostnamePartPattern)) {
                                var validParts = hostparts.slice(0, i);
                                var notHost = hostparts.slice(i + 1);
                                var bit = part.match(hostnamePartStart);
                                if (bit) {
                                    validParts.push(bit[1]);
                                    notHost.unshift(bit[2]);
                                }
                                if (notHost.length) {
                                    rest = '/' + notHost.join('.') + rest;
                                }
                                this.hostname = validParts.join('.');
                                break;
                            }
                        }
                    }
                }

                if (this.hostname.length > hostnameMaxLen) {
                    this.hostname = '';
                } else {
                    // hostnames are always lower case.
                    this.hostname = this.hostname.toLowerCase();
                }

                if (!ipv6Hostname) {
// IDNA Support: Returns a punycoded representation of "domain".
// It only converts parts of the domain name that
// have non-ASCII characters, i.e. it doesn't matter if
// you call it with a domain that already is ASCII-only.
                    this.hostname = punycode.toASCII(this.hostname);
                }

                var p = this.port ? ':' + this.port : '';
                var h = this.hostname || '';
                this.host = h + p;
                this.href += this.host;

// strip [ and ] from the hostname
// the host field still retains them, though
                if (ipv6Hostname) {
                    this.hostname = this.hostname.substr(1, this.hostname.length - 2);
                    if (rest[0] !== '/') {
                        rest = '/' + rest;
                    }
                }
            }

// now rest is set to the post-host stuff.
// chop off any delim chars.
            if (!unsafeProtocol[lowerProto]) {

// First, make 100% sure that any "autoEscape" chars get
// escaped, even if encodeURIComponent doesn't think they
// need to be.
                for (var i = 0, l = autoEscape.length; i < l; i++) {
                    var ae = autoEscape[i];
                    if (rest.indexOf(ae) === -1)
                        continue;
                    var esc = encodeURIComponent(ae);
                    if (esc === ae) {
                        esc = escape(ae);
                    }
                    rest = rest.split(ae).join(esc);
                }
            }


// chop off from the tail first.
            var hash = rest.indexOf('#');
            if (hash !== -1) {
// got a fragment string.
                this.hash = rest.substr(hash);
                rest = rest.slice(0, hash);
            }
            var qm = rest.indexOf('?');
            if (qm !== -1) {
                this.search = rest.substr(qm);
                this.query = rest.substr(qm + 1);
                if (parseQueryString) {
                    this.query = querystring.parse(this.query);
                }
                rest = rest.slice(0, qm);
            } else if (parseQueryString) {
// no query string, but parseQueryString still requested
                this.search = '';
                this.query = {};
            }
            if (rest) this.pathname = rest;
            if (slashedProtocol[lowerProto] &&
                this.hostname && !this.pathname) {
                this.pathname = '/';
            }

//to support http.request
            if (this.pathname || this.search) {
                var p = this.pathname || '';
                var s = this.search || '';
                this.path = p + s;
            }

// finally, reconstruct the href based on what has been validated.
            this.href = this.format();
            return this;
        };

// format a parsed object into a url string
        function urlFormat(obj) {
// ensure it's an object, and not a string url.
// If it's an obj, this is a no-op.
// this way, you can call url_format() on strings
// to clean up potentially wonky urls.
            if (util.isString(obj)) obj = urlParse(obj);
            if (!(obj instanceof Url)) return Url.prototype.format.call(obj);
            return obj.format();
        }

        Url.prototype.format = function() {
            var auth = this.auth || '';
            if (auth) {
                auth = encodeURIComponent(auth);
                auth = auth.replace(/%3A/i, ':');
                auth += '@';
            }

            var protocol = this.protocol || '',
                pathname = this.pathname || '',
                hash = this.hash || '',
                host = false,
                query = '';

            if (this.host) {
                host = auth + this.host;
            } else if (this.hostname) {
                host = auth + (this.hostname.indexOf(':') === -1 ?
                    this.hostname :
                    '[' + this.hostname + ']');
                if (this.port) {
                    host += ':' + this.port;
                }
            }

            if (this.query &&
                util.isObject(this.query) &&
                Object.keys(this.query).length) {
                query = querystring.stringify(this.query);
            }

            var search = this.search || (query && ('?' + query)) || '';

            if (protocol && protocol.substr(-1) !== ':') protocol += ':';

// only the slashedProtocols get the //.  Not mailto:, xmpp:, etc.
// unless they had them to begin with.
            if (this.slashes ||
                (!protocol || slashedProtocol[protocol]) && host !== false) {
                host = '//' + (host || '');
                if (pathname && pathname.charAt(0) !== '/') pathname = '/' + pathname;
            } else if (!host) {
                host = '';
            }

            if (hash && hash.charAt(0) !== '#') hash = '#' + hash;
            if (search && search.charAt(0) !== '?') search = '?' + search;

            pathname = pathname.replace(/[?#]/g, function(match) {
                return encodeURIComponent(match);
            });
            search = search.replace('#', '%23');

            return protocol + host + pathname + search + hash;
        };

        function urlResolve(source, relative) {
            return urlParse(source, false, true).resolve(relative);
        }

        Url.prototype.resolve = function(relative) {
            return this.resolveObject(urlParse(relative, false, true)).format();
        };

        function urlResolveObject(source, relative) {
            if (!source) return relative;
            return urlParse(source, false, true).resolveObject(relative);
        }

        Url.prototype.resolveObject = function(relative) {
            if (util.isString(relative)) {
                var rel = new Url();
                rel.parse(relative, false, true);
                relative = rel;
            }

            var result = new Url();
            var tkeys = Object.keys(this);
            for (var tk = 0; tk < tkeys.length; tk++) {
                var tkey = tkeys[tk];
                result[tkey] = this[tkey];
            }

// hash is always overridden, no matter what.
// even href="" will remove it.
            result.hash = relative.hash;

// if the relative url is empty, then there's nothing left to do here.
            if (relative.href === '') {
                result.href = result.format();
                return result;
            }

// hrefs like //foo/bar always cut to the protocol.
            if (relative.slashes && !relative.protocol) {
// take everything except the protocol from relative
                var rkeys = Object.keys(relative);
                for (var rk = 0; rk < rkeys.length; rk++) {
                    var rkey = rkeys[rk];
                    if (rkey !== 'protocol')
                        result[rkey] = relative[rkey];
                }

//urlParse appends trailing / to urls like http://www.example.com
                if (slashedProtocol[result.protocol] &&
                    result.hostname && !result.pathname) {
                    result.path = result.pathname = '/';
                }

                result.href = result.format();
                return result;
            }

            if (relative.protocol && relative.protocol !== result.protocol) {
// if it's a known url protocol, then changing
// the protocol does weird things
// first, if it's not file:, then we MUST have a host,
// and if there was a path
// to begin with, then we MUST have a path.
// if it is file:, then the host is dropped,
// because that's known to be hostless.
// anything else is assumed to be absolute.
                if (!slashedProtocol[relative.protocol]) {
                    var keys = Object.keys(relative);
                    for (var v = 0; v < keys.length; v++) {
                        var k = keys[v];
                        result[k] = relative[k];
                    }
                    result.href = result.format();
                    return result;
                }

                result.protocol = relative.protocol;
                if (!relative.host && !hostlessProtocol[relative.protocol]) {
                    var relPath = (relative.pathname || '').split('/');
                    while (relPath.length && !(relative.host = relPath.shift()));
                    if (!relative.host) relative.host = '';
                    if (!relative.hostname) relative.hostname = '';
                    if (relPath[0] !== '') relPath.unshift('');
                    if (relPath.length < 2) relPath.unshift('');
                    result.pathname = relPath.join('/');
                } else {
                    result.pathname = relative.pathname;
                }
                result.search = relative.search;
                result.query = relative.query;
                result.host = relative.host || '';
                result.auth = relative.auth;
                result.hostname = relative.hostname || relative.host;
                result.port = relative.port;
// to support http.request
                if (result.pathname || result.search) {
                    var p = result.pathname || '';
                    var s = result.search || '';
                    result.path = p + s;
                }
                result.slashes = result.slashes || relative.slashes;
                result.href = result.format();
                return result;
            }

            var isSourceAbs = (result.pathname && result.pathname.charAt(0) === '/'),
                isRelAbs = (
                    relative.host ||
                    relative.pathname && relative.pathname.charAt(0) === '/'
                ),
                mustEndAbs = (isRelAbs || isSourceAbs ||
                    (result.host && relative.pathname)),
                removeAllDots = mustEndAbs,
                srcPath = result.pathname && result.pathname.split('/') || [],
                relPath = relative.pathname && relative.pathname.split('/') || [],
                psychotic = result.protocol && !slashedProtocol[result.protocol];

// if the url is a non-slashed url, then relative
// links like ../.. should be able
// to crawl up to the hostname, as well.  This is strange.
// result.protocol has already been set by now.
// Later on, put the first path part into the host field.
            if (psychotic) {
                result.hostname = '';
                result.port = null;
                if (result.host) {
                    if (srcPath[0] === '') srcPath[0] = result.host;
                    else srcPath.unshift(result.host);
                }
                result.host = '';
                if (relative.protocol) {
                    relative.hostname = null;
                    relative.port = null;
                    if (relative.host) {
                        if (relPath[0] === '') relPath[0] = relative.host;
                        else relPath.unshift(relative.host);
                    }
                    relative.host = null;
                }
                mustEndAbs = mustEndAbs && (relPath[0] === '' || srcPath[0] === '');
            }

            if (isRelAbs) {
// it's absolute.
                result.host = (relative.host || relative.host === '') ?
                    relative.host : result.host;
                result.hostname = (relative.hostname || relative.hostname === '') ?
                    relative.hostname : result.hostname;
                result.search = relative.search;
                result.query = relative.query;
                srcPath = relPath;
// fall through to the dot-handling below.
            } else if (relPath.length) {
// it's relative
// throw away the existing file, and take the new path instead.
                if (!srcPath) srcPath = [];
                srcPath.pop();
                srcPath = srcPath.concat(relPath);
                result.search = relative.search;
                result.query = relative.query;
            } else if (!util.isNullOrUndefined(relative.search)) {
// just pull out the search.
// like href='?foo'.
// Put this after the other two cases because it simplifies the booleans
                if (psychotic) {
                    result.hostname = result.host = srcPath.shift();
//occationaly the auth can get stuck only in host
//this especially happens in cases like
//url.resolveObject('mailto:local1@domain1', 'local2@domain2')
                    var authInHost = result.host && result.host.indexOf('@') > 0 ?
                        result.host.split('@') : false;
                    if (authInHost) {
                        result.auth = authInHost.shift();
                        result.host = result.hostname = authInHost.shift();
                    }
                }
                result.search = relative.search;
                result.query = relative.query;
//to support http.request
                if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
                    result.path = (result.pathname ? result.pathname : '') +
                        (result.search ? result.search : '');
                }
                result.href = result.format();
                return result;
            }

            if (!srcPath.length) {
// no path at all.  easy.
// we've already handled the other stuff above.
                result.pathname = null;
//to support http.request
                if (result.search) {
                    result.path = '/' + result.search;
                } else {
                    result.path = null;
                }
                result.href = result.format();
                return result;
            }

// if a url ENDs in . or .., then it must get a trailing slash.
// however, if it ends in anything else non-slashy,
// then it must NOT get a trailing slash.
            var last = srcPath.slice(-1)[0];
            var hasTrailingSlash = (
                (result.host || relative.host || srcPath.length > 1) &&
                (last === '.' || last === '..') || last === '');

// strip single dots, resolve double dots to parent dir
// if the path tries to go above the root, `up` ends up > 0
            var up = 0;
            for (var i = srcPath.length; i >= 0; i--) {
                last = srcPath[i];
                if (last === '.') {
                    srcPath.splice(i, 1);
                } else if (last === '..') {
                    srcPath.splice(i, 1);
                    up++;
                } else if (up) {
                    srcPath.splice(i, 1);
                    up--;
                }
            }

// if the path is allowed to go above the root, restore leading ..s
            if (!mustEndAbs && !removeAllDots) {
                for (; up--; up) {
                    srcPath.unshift('..');
                }
            }

            if (mustEndAbs && srcPath[0] !== '' &&
                (!srcPath[0] || srcPath[0].charAt(0) !== '/')) {
                srcPath.unshift('');
            }

            if (hasTrailingSlash && (srcPath.join('/').substr(-1) !== '/')) {
                srcPath.push('');
            }

            var isAbsolute = srcPath[0] === '' ||
                (srcPath[0] && srcPath[0].charAt(0) === '/');

// put the host back
            if (psychotic) {
                result.hostname = result.host = isAbsolute ? '' :
                    srcPath.length ? srcPath.shift() : '';
//occationaly the auth can get stuck only in host
//this especially happens in cases like
//url.resolveObject('mailto:local1@domain1', 'local2@domain2')
                var authInHost = result.host && result.host.indexOf('@') > 0 ?
                    result.host.split('@') : false;
                if (authInHost) {
                    result.auth = authInHost.shift();
                    result.host = result.hostname = authInHost.shift();
                }
            }

            mustEndAbs = mustEndAbs || (result.host && srcPath.length);

            if (mustEndAbs && !isAbsolute) {
                srcPath.unshift('');
            }

            if (!srcPath.length) {
                result.pathname = null;
                result.path = null;
            } else {
                result.pathname = srcPath.join('/');
            }

//to support request.http
            if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
                result.path = (result.pathname ? result.pathname : '') +
                    (result.search ? result.search : '');
            }
            result.auth = relative.auth || result.auth;
            result.slashes = result.slashes || relative.slashes;
            result.href = result.format();
            return result;
        };

        Url.prototype.parseHost = function() {
            var host = this.host;
            var port = portPattern.exec(host);
            if (port) {
                port = port[0];
                if (port !== ':') {
                    this.port = port.substr(1);
                }
                host = host.substr(0, host.length - port.length);
            }
            if (host) this.hostname = host;
        };


        /***/ }),

    /***/ "./node_modules/url/util.js":
    /*!**********************************!*\
  !*** ./node_modules/url/util.js ***!
  \**********************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {

        "use strict";


        module.exports = {
            isString: function(arg) {
                return typeof(arg) === 'string';
            },
            isObject: function(arg) {
                return typeof(arg) === 'object' && arg !== null;
            },
            isNull: function(arg) {
                return arg === null;
            },
            isNullOrUndefined: function(arg) {
                return arg == null;
            }
        };


        /***/ }),

    /***/ "./node_modules/webpack-hot-client/client/hot.js":
    /*!******************************************!*\
  !*** (webpack)-hot-client/client/hot.js ***!
  \******************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {

        "use strict";


        var log = __webpack_require__(/*! ./log */ "./node_modules/webpack-hot-client/client/log.js");

        var refresh = 'Please refresh the page.';
        var hotOptions = {
            ignoreUnaccepted: true,
            ignoreDeclined: true,
            ignoreErrored: true,
            onUnaccepted: function onUnaccepted(data) {
                var chain = [].concat(data.chain);
                var last = chain[chain.length - 1];

                if (last === 0) {
                    chain.pop();
                }

                log.warn("Ignored an update to unaccepted module ".concat(chain.join(' ➭ ')));
            },
            onDeclined: function onDeclined(data) {
                log.warn("Ignored an update to declined module ".concat(data.chain.join(' ➭ ')));
            },
            onErrored: function onErrored(data) {
                log.warn("Ignored an error while updating module ".concat(data.moduleId, " <").concat(data.type, ">"));
                log.warn(data.error);
            }
        };
        var lastHash;

        function upToDate() {
            return lastHash.indexOf(__webpack_require__.h()) >= 0;
        }

        function result(modules, appliedModules) {
            var unaccepted = modules.filter(function (moduleId) {
                return appliedModules && appliedModules.indexOf(moduleId) < 0;
            });

            if (unaccepted.length > 0) {
                var message = 'The following modules could not be updated:';
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = unaccepted[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var _moduleId = _step.value;
                        message += "\n          \u29BB ".concat(_moduleId);
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }

                log.warn(message);
            }

            if (!(appliedModules || []).length) {
                log.info('No Modules Updated.');
            } else {
                var _message = ['The following modules were updated:'];
                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                    for (var _iterator2 = appliedModules[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        var _moduleId3 = _step2.value;

                        _message.push("         \u21BB ".concat(_moduleId3));
                    }
                } catch (err) {
                    _didIteratorError2 = true;
                    _iteratorError2 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
                            _iterator2.return();
                        }
                    } finally {
                        if (_didIteratorError2) {
                            throw _iteratorError2;
                        }
                    }
                }

                log.info(_message.join('\n'));
                var numberIds = appliedModules.every(function (moduleId) {
                    return typeof moduleId === 'number';
                });

                if (numberIds) {
                    log.info('Please consider using the NamedModulesPlugin for module names.');
                }
            }
        }

        function check(options) {
            module.hot.check().then(function (modules) {
                if (!modules) {
                    log.warn("Cannot find update. The server may have been restarted. ".concat(refresh));

                    if (options.reload) {
                        window.location.reload();
                    }

                    return;
                }

                var hotOpts = options.reload ? {} : hotOptions;
                return module.hot.apply(hotOpts).then(function (appliedModules) {
                    if (!upToDate()) {
                        check(options);
                    }

                    result(modules, appliedModules);

                    if (upToDate()) {
                        log.info('App is up to date.');
                    }
                }).catch(function (err) {
                    var status = module.hot.status();

                    if (['abort', 'fail'].indexOf(status) >= 0) {
                        log.warn("Cannot apply update. ".concat(refresh));
                        log.warn(err.stack || err.message);

                        if (options.reload) {
                            window.location.reload();
                        }
                    } else {
                        log.warn("Update failed: ".concat(err.stack) || err.message);
                    }
                });
            }).catch(function (err) {
                var status = module.hot.status();

                if (['abort', 'fail'].indexOf(status) >= 0) {
                    log.warn("Cannot check for update. ".concat(refresh));
                    log.warn(err.stack || err.message);

                    if (options.reload) {
                        window.location.reload();
                    }
                } else {
                    log.warn("Update check failed: ".concat(err.stack) || err.message);
                }
            });
        }

        if (true) {
            log.info('Hot Module Replacement Enabled. Waiting for signal.');
        } else {}

        module.exports = function update(currentHash, options) {
            lastHash = currentHash;

            if (!upToDate()) {
                var status = module.hot.status();

                if (status === 'idle') {
                    log.info('Checking for updates to the bundle.');
                    check(options);
                } else if (['abort', 'fail'].indexOf(status) >= 0) {
                    log.warn("Cannot apply update. A previous update ".concat(status, "ed. ").concat(refresh));

                    if (options.reload) {
                        window.location.reload();
                    }
                }
            }
        };

        /***/ }),

    /***/ "./node_modules/webpack-hot-client/client/index.js?7a31fa98-7ae9-4c1e-9b2c-fe31fd9f80af":
    /*!************************************************************************!*\
  !*** (webpack)-hot-client/client?7a31fa98-7ae9-4c1e-9b2c-fe31fd9f80af ***!
  \************************************************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {

        "use strict";
// this is piped in at runtime build via DefinePlugin in /lib/plugins.js
// eslint-disable-next-line no-unused-vars, no-undef

        var options = {"host":{"server":"localhost","client":"localhost"},"hot":true,"https":false,"logLevel":"info","logTime":false,"port":8081,"reload":true,"server":null,"stats":{"context":"/var/www/html/CuacaEmerge/lightbox-master"},"test":false,"log":{"type":"LogLevel","options":{"factory":null,"level":"info","name":"hot","prefix":{"template":"{{level}} \u001b[90m｢{{name}}｣\u001b[39m: "},"unique":true,"timestamp":false},"methodFactory":{"options":{"template":"{{level}} \u001b[90m｢{{name}}｣\u001b[39m: "}},"name":"hot","currentLevel":2},"webSocket":{"host":"localhost","port":8081}};

        var log = __webpack_require__(/*! ./log */ "./node_modules/webpack-hot-client/client/log.js"); // eslint-disable-line import/order


        log.level = options.logLevel;

        var update = __webpack_require__(/*! ./hot */ "./node_modules/webpack-hot-client/client/hot.js");

        var socket = __webpack_require__(/*! ./socket */ "./node_modules/webpack-hot-client/client/socket.js");

        if (!options) {
            throw new Error('Something went awry and __hotClientOptions__ is undefined. Possible bad build. HMR cannot be enabled.');
        }

        var currentHash;
        var initial = true;
        var isUnloading;
        window.addEventListener('beforeunload', function () {
            isUnloading = true;
        });

        function reload() {
            if (isUnloading) {
                return;
            }

            if (options.hot) {
                log.info('App Updated, Reloading Modules');
                update(currentHash, options);
            } else if (options.reload) {
                log.info('Refreshing Page');
                window.location.reload();
            } else {
                log.warn('Please refresh the page manually.');
                log.info('The `hot` and `reload` options are set to false.');
            }
        }

        socket(options, {
            compile: function compile() {
                log.info('webpack: Compiling...');
            },
            errors: function errors(_errors) {
                log.error('webpack: Encountered errors while compiling. Reload prevented.');

                for (var i = 0; i < _errors.length; i++) {
                    log.error(_errors[i]);
                }
            },
            hash: function hash(_hash) {
                currentHash = _hash;
            },
            invalid: function invalid() {
                log.info('App updated. Recompiling');
            },
            ok: function ok() {
                if (initial) {
                    initial = false;
                    return initial;
                }

                reload();
            },
            'window-reload': function windowReload() {
                window.location.reload();
            },
            warnings: function warnings(_warnings) {
                log.warn('Warnings while compiling.');

                for (var i = 0; i < _warnings.length; i++) {
                    log.warn(_warnings[i]);
                }

                if (initial) {
                    initial = false;
                    return initial;
                }

                reload();
            }
        });

        /***/ }),

    /***/ "./node_modules/webpack-hot-client/client/log.js":
    /*!******************************************!*\
  !*** (webpack)-hot-client/client/log.js ***!
  \******************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {

        "use strict";
// eslint-disable-next-line import/no-extraneous-dependencies

        function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

        function _sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

        function _slicedToArray(arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return _sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }

        var loglevel = __webpack_require__(/*! loglevelnext/dist/loglevelnext */ "./node_modules/loglevelnext/dist/loglevelnext.js");

        var MethodFactory = loglevel.factories.MethodFactory;
        var css = {
            prefix: 'color: #999; padding: 0 0 0 20px; line-height: 16px; background: url(https://webpack.js.org/6bc5d8cf78d442a984e70195db059b69.svg) no-repeat; background-size: 16px 16px; background-position: 0 -2px;',
            reset: 'color: #444'
        };
        var log = loglevel.getLogger({
            name: 'hot',
            id: 'hot-middleware/client'
        });

        function IconFactory(logger) {
            MethodFactory.call(this, logger);
        }

        IconFactory.prototype = Object.create(MethodFactory.prototype);
        IconFactory.prototype.constructor = IconFactory;

        IconFactory.prototype.make = function make(methodName) {
            var og = MethodFactory.prototype.make.call(this, methodName);
            return function _() {
                for (var _len = arguments.length, params = new Array(_len), _key = 0; _key < _len; _key++) {
                    params[_key] = arguments[_key];
                }

                var args = [].concat(params);
                var prefix = '%c｢hot｣ %c';

                var _args = _slicedToArray(args, 1),
                    first = _args[0];

                if (typeof first === 'string') {
                    args[0] = prefix + first;
                } else {
                    args.unshift(prefix);
                }

                args.splice(1, 0, css.prefix, css.reset);
                og.apply(void 0, _toConsumableArray(args));
            };
        };

        log.factory = new IconFactory(log, {});
        log.group = console.group; // eslint-disable-line no-console

        log.groupCollapsed = console.groupCollapsed; // eslint-disable-line no-console

        log.groupEnd = console.groupEnd; // eslint-disable-line no-console

        module.exports = log;

        /***/ }),

    /***/ "./node_modules/webpack-hot-client/client/socket.js":
    /*!*********************************************!*\
  !*** (webpack)-hot-client/client/socket.js ***!
  \*********************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {

        "use strict";


        var url = __webpack_require__(/*! url */ "./node_modules/url/url.js");

        var log = __webpack_require__(/*! ./log */ "./node_modules/webpack-hot-client/client/log.js");

        var maxRetries = 10;
        var retry = maxRetries;

        module.exports = function connect(options, handler) {
            var socketUrl = url.format({
                protocol: options.https ? 'wss' : 'ws',
                hostname: options.webSocket.host,
                port: options.webSocket.port,
                slashes: true
            });
            var open = false;
            var socket = new WebSocket(socketUrl);
            socket.addEventListener('open', function () {
                open = true;
                retry = maxRetries;
                log.info('WebSocket connected');
            });
            socket.addEventListener('close', function () {
                log.warn('WebSocket closed');
                open = false;
                socket = null; // exponentation operator ** isn't supported by IE at all
// eslint-disable-next-line no-restricted-properties

                var timeout = 1000 * Math.pow(maxRetries - retry, 2) + Math.random() * 100;

                if (open || retry <= 0) {
                    log.warn("WebSocket: ending reconnect after ".concat(maxRetries, " attempts"));
                    return;
                }

                log.info("WebSocket: attempting reconnect in ".concat(parseInt(timeout / 1000, 10), "s"));
                setTimeout(function () {
                    retry -= 1;
                    connect(options, handler);
                }, timeout);
            });
            socket.addEventListener('message', function (event) {
                log.debug('WebSocket: message:', event.data);
                var message = JSON.parse(event.data);

                if (handler[message.type]) {
                    handler[message.type](message.data);
                }
            });
        };

        /***/ }),

    /***/ "./node_modules/webpack/buildin/global.js":
    /*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
    /*! no static exports found */
    /***/ (function(module, exports) {

        var g;

// This works in non-strict mode
        g = (function() {
            return this;
        })();

        try {
// This works if eval is allowed (see CSP)
            g = g || Function("return this")() || (1, eval)("this");
        } catch (e) {
// This works if the window reference is available
            if (typeof window === "object") g = window;
        }

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

        module.exports = g;


        /***/ }),

    /***/ "./node_modules/webpack/buildin/module.js":
    /*!***********************************!*\
  !*** (webpack)/buildin/module.js ***!
  \***********************************/
    /*! no static exports found */
    /***/ (function(module, exports) {

        module.exports = function(module) {
            if (!module.webpackPolyfill) {
                module.deprecate = function() {};
                module.paths = [];
// module.parent = undefined by default
                if (!module.children) module.children = [];
                Object.defineProperty(module, "loaded", {
                    enumerable: true,
                    get: function() {
                        return module.l;
                    }
                });
                Object.defineProperty(module, "id", {
                    enumerable: true,
                    get: function() {
                        return module.i;
                    }
                });
                module.webpackPolyfill = 1;
            }
            return module;
        };


        /***/ }),

    /***/ 0:
    /*!******************************************************************!*\
  !*** multi ./ekko-lightbox.js ./ekko-lightbox.less ./index.html ***!
  \******************************************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {

        __webpack_require__(/*! ./ekko-lightbox.js */"./ekko-lightbox.js");
        __webpack_require__(/*! ./ekko-lightbox.less */"./ekko-lightbox.less");
        module.exports = __webpack_require__(/*! ./index.html */"./index.html");


        /***/ }),

    /***/ 2:
    /*!*********************************************************************************************************************************!*\
  !*** multi webpack-hot-client/client?7a31fa98-7ae9-4c1e-9b2c-fe31fd9f80af ./ekko-lightbox.js ./ekko-lightbox.less ./index.html ***!
  \*********************************************************************************************************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {

        __webpack_require__(/*! webpack-hot-client/client?7a31fa98-7ae9-4c1e-9b2c-fe31fd9f80af */"./node_modules/webpack-hot-client/client/index.js?7a31fa98-7ae9-4c1e-9b2c-fe31fd9f80af");
        __webpack_require__(/*! ./ekko-lightbox.js */"./ekko-lightbox.js");
        __webpack_require__(/*! ./ekko-lightbox.less */"./ekko-lightbox.less");
        module.exports = __webpack_require__(/*! ./index.html */"./index.html");


        /***/ })

    /******/ });
//# sourceMappingURL=main.js.map