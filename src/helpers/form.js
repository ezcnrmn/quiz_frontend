const path = (obj, path) => {
	let scope = obj;
	for (let i = 0; i < path.length; i++) {
		try {
			if (path[i] in scope) {
				scope = scope[path[i]];
			} else {
				return null;
			}
		} catch (error) {
			return null;
		}
	}
	return scope;
};

export default {
	path,
};
