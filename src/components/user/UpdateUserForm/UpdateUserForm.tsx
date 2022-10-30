import * as API from 'api/Api'
import { Button, Input } from 'components/ui'
import { useUpdateUserForm } from 'lib/hooks/react-hook-form/useUpdateUserForm'
import { useRouter } from 'lib/hooks/useRouter'
import { FC } from 'react'
import { useAppDispatch } from 'store/app/hooks'
import { removeModal } from 'store/features/globalSlice'
import { Col, Form, FormFeedback, FormGroup, Label, Row } from 'styles'

const UpdateUserForm: FC = () => {
  const disptach = useAppDispatch()
  const { navigate } = useRouter()
  const { errors, handleSubmit, register, reset } = useUpdateUserForm()

  const onSubmit = handleSubmit(async (data) => {
    console.log(data)
  })

  return (
    <Form role="form" onSubmit={onSubmit}>
      <FormGroup>
        <Label htmlFor="email">Email</Label>
        <Input type="email" id="email" register={register} placeholder="" />
        {errors.email && <FormFeedback>{errors.email.message as string}</FormFeedback>}
      </FormGroup>
      <Row direction="row">
        <Col size={1} margin={{ right: '8px' }}>
          <FormGroup>
            <Label htmlFor="first_name">First name</Label>
            <Input type="text" id="first_name" register={register} placeholder="" />
            {errors.first_name && <FormFeedback>{errors.first_name.message as string}</FormFeedback>}
          </FormGroup>
        </Col>
        <Col size={1} margin={{ left: '8px' }}>
          <FormGroup>
            <Label htmlFor="last_name">Last name</Label>
            <Input type="text" id="last_name" register={register} placeholder="" />
            {errors.last_name && <FormFeedback>{errors.last_name.message as string}</FormFeedback>}
          </FormGroup>
        </Col>
      </Row>
      <Row direction="row" style={{ marginTop: '1rem' }}>
        <Col size={0} margin={{ right: '1rem' }}>
          <Button texttransform="uppercase" type="submit" aria-label="Update user">
            Submit
          </Button>
        </Col>
        <Button className="link" type="button" onClick={() => disptach(removeModal())} aria-label="Cancel update user">
          Cancel
        </Button>
      </Row>
    </Form>
  )
}

export default UpdateUserForm
