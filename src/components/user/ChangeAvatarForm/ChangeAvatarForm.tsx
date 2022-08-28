import { Avatar } from '@mui/material'
import * as API from 'api/Api'
import { Button, Input } from 'components/ui'
import { fileSelected } from 'lib/helpers/fileSelected'
import authStore from 'lib/stores/auth.store'
import globalStore from 'lib/stores/global.store'
import { observer } from 'mobx-react'
import { FC, FormEvent, useEffect, useState } from 'react'
import { Col, Form, FormGroup, Label, Row } from 'styles'
import { openProfileModal, openUpdateSuccessModal } from 'utils/modal'
import { Snackbar } from 'utils/snackbar'

const ChangeAvatarForm: FC = () => {
  const [file, setFile] = useState<File | null>(null)
  const [fileError, setFileError] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (file) {
      globalStore.setGlobalLoading({ payload: true })
      const { url }: API.UrlResponse = await API.generateUploadUrl()
      await API.uploadImage(url, file)
      const res = await API.updateUser({ profile_image: url }, authStore.user?.id as string)
      globalStore.setGlobalLoading({ payload: false })
      if (res.error) {
        Snackbar.error(res.message)
      } else {
        authStore.login(res)
        openUpdateSuccessModal()
      }
    } else {
      setFileError(true)
    }
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
    <Form onSubmit={onSubmit}>
      <FormGroup className="avatar">
        <Label htmlFor="file">
          <Avatar
            style={fileError ? { boxShadow: '0px 0px 8px #ff0000' } : { boxShadow: '0px 0px 8px rgba(50,45,56,0.15)' }}
            src={preview as string}
          />
        </Label>
        <Input id="avatar-upload" type="file" accept="image/*" name="file" onChange={(e) => fileSelected(e, setFile)} />
      </FormGroup>
      <FormGroup className="avatar button-style">
        <Label htmlFor="file">
          <Button size="full" texttransform="uppercase" type="button">
            Upload new image
          </Button>
        </Label>
        <Input id="avatar-upload" type="file" accept="image/*" name="file" onChange={(e) => fileSelected(e, setFile)} />
      </FormGroup>
      <Row direction="row" style={{ marginTop: '1rem' }}>
        <Col size={0} margin={{ right: '1rem' }}>
          <Button texttransform="uppercase" type="submit">
            Submit
          </Button>
        </Col>
        <Button className="link" type="button" onClick={openProfileModal}>
          Cancel
        </Button>
      </Row>
    </Form>
  )
}

export default observer(ChangeAvatarForm)
