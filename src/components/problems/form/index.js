import React from 'react';
import { Field } from 'formik';
import { Grid } from '@material-ui/core';
import { KeyboardDatePicker } from '@material-ui/pickers';

import InputField from 'shared/components/input';
import UserSelect from 'shared/components/select-user';
import SelectStatus from 'shared/components/select-status';
import { createField } from 'shared/components/datePicker';
import { withTranslate } from 'shared/components/translate';
import SelectIndicator from 'shared/components/select-indicator';
import DescriptionInput from './descriptionField'

const Picker = createField(KeyboardDatePicker);

const ProblemForm = ({ translate }) => (
  <Grid container spacing={1}>
    <Grid container item spacing={1}>
      <Grid item xs={12} md={6}>
        <Field
          required
          fullWidth
          name='description'
          multiline
          rows={3}
          label={translate("problems.table.description")}
          component={DescriptionInput}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Field
          required
          fullWidth
          component={InputField}
          multiline
          rows={3}
          name='actionDescription'
          label={translate("problems.table.actionDescription")}
        />
      </Grid>
    </Grid>
    <Grid container item xs={12} md={6}>
      <Grid item xs={12}>
        <Field
          fullWidth
          isClearable
          component={UserSelect}
          name='createdBy'
          label={translate("problems.table.createdBy")}
        />
      </Grid>
      <Grid item xs={12}>
        <Field
          required
          fullWidth
          component={UserSelect}
          name='assignTo'
          label={translate("problems.table.assignTo")}
        />
      </Grid>
      <Grid item xs={12}>
        <Field
          required
          fullWidth
          component={SelectStatus}
          name='status'
          label={translate("problems.table.status")}
        />
      </Grid>
    </Grid>
    <Grid container item xs={6}>
      <Grid item xs={12}>
        <Field
          fullWidth
          disableToolbar
          autoOk
          allowKeyboardControl
          variant="inline"
          format="YYYY-MM-DD"
          component={Picker}
          placeholder={translate("common.select")}
          name='endAt[0].time'
          label={translate("problems.table.date1")}
        />
      </Grid>
      <Grid item xs={12}>
        <Field
          autoOk
          fullWidth
          disableToolbar
          variant="inline"
          format="YYYY-MM-DD"
          component={Picker}
          placeholder={translate("common.select")}
          name='endAt[1].time'
          label={translate("problems.table.date2")}
        />
      </Grid>
      <Grid item xs={12}>
        <Field
          autoOk
          fullWidth
          disableToolbar
          variant="inline"
          format="YYYY-MM-DD"
          component={Picker}
          placeholder={translate("common.select")}
          name='endAt[2].time'
          label={translate("problems.table.date3")}
        />
      </Grid>
    </Grid>
    <Grid item xs={12}>
      <Field
        fullWidth
        component={SelectIndicator}
        name='indicator'
        label={translate("problems.table.indicator")}
      />
    </Grid>
  </Grid>
)

export default withTranslate(ProblemForm)