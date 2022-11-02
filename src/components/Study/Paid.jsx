import {paidByMe} from "@/apis/index.js";

export default ({userId, appointmentId}) => {

  const handlePaid = (e) => {
    e.preventDefault()

    // paidByMe(userId, appointmentId)
    window.alert('unsupported.')
  }

  return (
    <form onSubmit={handlePaid} className="flex flex-col justify-center">
      <input type="submit" className="btn btn-info btn-sm inline mx-auto" value="Paid By Me"/>
    </form>
  )
}