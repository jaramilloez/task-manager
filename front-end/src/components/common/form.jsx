import React, { Component } from "react";
import Joi from "joi-browser";
import Select from "./select";
import Input from "./input";
import React, { Component } from "react";
import Joi from "joi-browser";
import Select from "./select";
import Input from "./input";

class Form extends Component {
  state = {
    data: {},
    errors: {},
  };
  state = {
    data: {},
    errors: {},
  };

  validate = () => {
    const { error } = Joi.validate(this.state.data, this.schema, {
      abortEarly: false,
    });
    if (!error) return null;
    const errors = {};
  validate = () => {
    const { error } = Joi.validate(this.state.data, this.schema, {
      abortEarly: false,
    });
    if (!error) return null;
    const errors = {};

    for (let item of error.details) {
      errors[item.path[0]] = item.message;
    }

    return errors;
  };
    for (let item of error.details) {
      errors[item.path[0]] = item.message;
    }

    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };
  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) {
      console.log(errors);
      return;
    }

    this.doSubmit();
  };

  handleChange = (event) => {
    const input = event.target;

    //Handles errors
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];
    //Handles errors
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    //Updates the state
    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
  };
    //Updates the state
    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
  };

  renderButton(label) {
    return <button className="btn btn-primary">{label}</button>;
  }

  renderInput(name, label, type = "text") {
    const { data, errors } = this.state;
  renderButton(label) {
    return <button className="btn btn-primary">{label}</button>;
  }

  renderInput(name, label, type = "text") {
    const { data, errors } = this.state;

    return (
      <Input
        name={name}
        label={label}
        error={errors[name]}
        type={type}
        value={data[name]}
        onChange={this.handleChange}
      />
    );
  }

  renderSelect(name, label, options) {
    const { data, errors } = this.state;
    return (
      <Input
        name={name}
        label={label}
        error={errors[name]}
        type={type}
        value={data[name]}
        onChange={this.handleChange}
      />
    );
  }

  renderSelect(name, label, options) {
    const { data, errors } = this.state;

    return (
      <Select
        name={name}
        label={label}
        error={errors[name]}
        options={options}
        value={data[name]}
        onChange={(event) => this.handleChange(event, options)}
      />
    );
  }
    return (
      <Select
        name={name}
        label={label}
        error={errors[name]}
        options={options}
        value={data[name]}
        onChange={(event) => this.handleChange(event, options)}
      />
    );
  }
}


export default Form;

