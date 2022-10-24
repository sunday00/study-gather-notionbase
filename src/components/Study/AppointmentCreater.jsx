import {appointment} from "@/apis/index.js";
import {useState} from "react";

export default ({date}) => {
  const [data, setData] = useState({
    type: {type: 'select', content: 'study'},
    place: {type: 'string', content: '낙성대역40초 캄앤심플'},
    price: {type: 'number', content: 28800},
    date: {type: 'date', content: date},
  })

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    appointment(data)
      .then(res => {
        console.log(res)
      })
  }

  return (<div className="w-full">
    <form className="flex flex-col justify-center p-16 w-full" onSubmit={handleSubmit}>
      <div className="form-control w-[60%] max-w-xs mx-auto mb-8">
        <label className="label" htmlFor="type">
          <span className="label-text">type</span>
        </label>
        <select className="select select-bordered" name="type" id="type" onChange={handleChange}>
          <option value="study">스터디</option>
          <option value="dinner">회식</option>
        </select>
      </div>

      <div className="form-control w-[60%] max-w-xs mx-auto mb-8">
        <label className="label" htmlFor="place">
          <span className="label-text">place</span>
        </label>
        <input required={true} type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs"
               id="place" name="place" defaultValue={data.place.content} onChange={handleChange}/>
      </div>

      <div className="form-control w-[60%] max-w-xs mx-auto mb-8">
        <label className="label" htmlFor="price">
          <span className="label-text">price</span>
        </label>
        <input required={true} type="number" placeholder="Type here" className="input input-bordered w-full max-w-xs"
               id="price" name="price" defaultValue={data.price.content} onChange={handleChange}/>
      </div>

      <div className="form-control w-[60%] max-w-xs mx-auto mb-8">
        <label className="label" htmlFor="date">
          <span className="label-text">date</span>
        </label>
        <input required={true} type="date" placeholder="Type here" className="input input-bordered w-full max-w-xs"
               id="date" name="date" defaultValue={data.date.content} onChange={handleChange}/>
      </div>

      <input type="submit" className="btn btn-info btn-sm inline mx-auto" value="submit"/>
    </form>
  </div>)
}