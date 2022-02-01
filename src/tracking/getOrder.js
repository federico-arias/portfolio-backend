const R = require("ramda")

const outerJoin = (arr0, arr1) =>
	R.values(
		R.mergeWith(
			R.mergeLeft,
			R.indexBy(R.prop("tracking_number"), arr0),
			R.indexBy(R.prop("tracking_number"), arr1),
		),
	)

const uniq = R.uniqBy(R.prop("tracking_number"))
const toDate = (ts) => new Date(ts)

/**
 * Performs an OUTER JOIN between two array of objects.
 */
const getOrder = (trackings, checkpoints) => {
	const tsLens = R.lensProp("timestamp")
	const sortedCheckpoints = R.pipe(
		R.map(R.over(tsLens, toDate)),
		R.sortBy(R.prop("timestamp")),
		R.reverse,
		R.uniqBy(R.prop("tracking_number")),
	)(checkpoints)

	return outerJoin(uniq(trackings), sortedCheckpoints)
}

module.exports = { getOrder }
