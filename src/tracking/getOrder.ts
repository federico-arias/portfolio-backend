import { uniqBy, prop, sortBy } from "ramda"
//import { uniqBy, indexBy, sortBy, innerJoin, prop, eqBy, eqProps } from "ramda"

export const getOrder = (trackings: any[], checkpoints: any[]) => {
	//1. get unique row on tracking
	const uniq = uniqBy(prop("id"))
	//return uniq(trackings)
	//2. sort checkpoints by timestamp asc
	const sorted = sortBy(prop("unix_timestamp"))
	return [uniq(sorted(checkpoints)), uniq(trackings)]
	//3. index checkpoints

	//4. inner join
}
