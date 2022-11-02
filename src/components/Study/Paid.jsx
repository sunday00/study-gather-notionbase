import {paidByMe} from "@/apis/index.js";

export default ({userId, appointmentId}) => {

  const handlePaid = (e) => {
    e.preventDefault()

    // paidByMe(userId, appointmentId)
    window.alert('unsupported.')

    window.open('https://www.notion.so/sunday00-study/f286c7c472df4918a2006939f019d60d?v=82592bd5ede84f5c968495fa3f792e1b', '_blank')
  }

  return (
    <form onSubmit={handlePaid} className="flex flex-col justify-center">
      <input type="submit" className="btn btn-info btn-sm inline mx-auto" value="Paid By Me"/>
    </form>
  )
}