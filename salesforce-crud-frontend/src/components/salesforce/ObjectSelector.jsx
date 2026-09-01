import {SALESFORCE_OBJECTS} from '../../config/salesforceObjects';
export default function ObjectSelector({value,onChange}){return <select value={value} onChange={e=>onChange(e.target.value)} className="rounded-xl border bg-white px-4 py-2.5 text-sm">{Object.entries(SALESFORCE_OBJECTS).map(([key,v])=><option key={key} value={key}>{v.label}</option>)}</select>}
