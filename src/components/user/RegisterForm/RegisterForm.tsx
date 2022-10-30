import * as API from 'api/Api'
import { Button, Input, Link, PasswordInput } from 'components/ui'
import Avatar from 'components/ui/Avatar/Avatar'
import { fileSelected } from 'lib/helpers/fileSelected'
import { useRegisterForm } from 'lib/hooks/react-hook-form/useRegisterForm'
import { FC, useEffect, useState } from 'react'
import { Col, Form, FormFeedback, FormGroup, Label, P, Row } from 'styles'

const RegisterForm: FC = () => {
  const { errors, handleSubmit, register, reset } = useRegisterForm()
  const [file, setFile] = useState<File | null>(null)
  const [fileError, setFileError] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)

  const onSubmit = handleSubmit(async (dataset) => {
    if (file) {
      console.log(dataset)

      setFileError(false)
    } else {
      setFileError(true)
    }
  })

  const handleFileError = () => {
    if (!file) setFileError(true)
  }

  useEffect(() => {
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
        setFileError(false)
      }
      reader.readAsDataURL(file)
    } else {
      setPreview(null)
    }
  }, [file])

  return (
    <Form role="form" onSubmit={onSubmit}>
      <FormGroup className="avatar">
        <Label htmlFor="file">
          <Avatar
            style={fileError ? { boxShadow: '0px 0px 8px #ff0000' } : { boxShadow: '0px 0px 8px rgba(50,45,56,0.15)' }}
            src={preview as string}
          />
        </Label>
        <Input
          id="avatar-upload"
          type="file"
          accept="image/*"
          aria-label="upload avatar"
          name="file"
          onChange={(e) => fileSelected(e, setFile)}
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="email">Email</Label>
        <Input type="email" id="email" register={register} placeholder="" />
        {errors.email && <FormFeedback>{errors.email.message}</FormFeedback>}
      </FormGroup>
      <Row direction="row">
        <Col size={1} margin={{ right: '8px' }}>
          <FormGroup>
            <Label htmlFor="first_name">First name</Label>
            <Input type="text" id="first_name" register={register} placeholder="" />
            {errors.first_name && <FormFeedback>{errors.first_name.message}</FormFeedback>}
          </FormGroup>
        </Col>
        <Col size={1} margin={{ left: '8px' }}>
          <FormGroup>
            <Label htmlFor="last_name">Last name</Label>
            <Input type="text" id="last_name" register={register} placeholder="" />
            {errors.last_name && <FormFeedback>{errors.last_name.message}</FormFeedback>}
          </FormGroup>
        </Col>
      </Row>
      <FormGroup>
        <PasswordInput id="password" register={register} label="Password" />
        {errors.password && <FormFeedback>{errors.password.message}</FormFeedback>}
      </FormGroup>
      <FormGroup>
        <PasswordInput id="confirm_password" register={register} label="Confirm password" />
        {errors.confirm_password && <FormFeedback>{errors.confirm_password.message}</FormFeedback>}
      </FormGroup>
      <FormGroup>
        <Button onMouseDown={handleFileError} size="full" texttransform="uppercase" type="submit">
          Create Account
        </Button>
      </FormGroup>
      <FormGroup className="goto">
        <div>
          <P>Already have an account?</P>
          <Link className="link" to="/login">
            Sign in
          </Link>
        </div>
      </FormGroup>
    </Form>
  )
}

export default RegisterForm
