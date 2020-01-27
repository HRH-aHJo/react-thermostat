import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import ThermostatStatus from "./ThermostatStatus";

{/* This test suite is responsible testing ThermostatStatus component and checking if only one item is selected at a time */}

afterEach(cleanup);

test('click off switch works', () => {
    const { container, getByTestId } = render(<ThermostatStatus />)
    const offButton = getByTestId("off-switch")
    const coolButton = getByTestId("cool-switch")
    const heatButton = getByTestId("heat-switch")
    const fanButton = getByTestId("fan-switch")
    const autoButton = getByTestId("auto-switch")
    fireEvent.click(offButton)
    expect(offButton).toHaveClass('MuiButton-containedPrimary')
    expect(coolButton).toHaveClass('MuiButton-contained')
    expect(heatButton).toHaveClass('MuiButton-contained')
    expect(fanButton).toHaveClass('MuiButton-contained')
    expect(autoButton).toHaveClass('MuiButton-contained')
})

test('click cool switch works', () => {
    const { container, getByTestId } = render(<ThermostatStatus />)
    const offButton = getByTestId("off-switch")
    const coolButton = getByTestId("cool-switch")
    const heatButton = getByTestId("heat-switch")
    const fanButton = getByTestId("fan-switch")
    const autoButton = getByTestId("auto-switch")
    fireEvent.click(coolButton)
    expect(offButton).toHaveClass('MuiButton-contained')
    expect(coolButton).toHaveClass('MuiButton-containedPrimary')
    expect(heatButton).toHaveClass('MuiButton-contained')
    expect(fanButton).toHaveClass('MuiButton-contained')
    expect(autoButton).toHaveClass('MuiButton-contained')
})

test('click heat switch works', () => {
    const { container, getByTestId } = render(<ThermostatStatus />)
    const offButton = getByTestId("off-switch")
    const coolButton = getByTestId("cool-switch")
    const heatButton = getByTestId("heat-switch")
    const fanButton = getByTestId("fan-switch")
    const autoButton = getByTestId("auto-switch")
    fireEvent.click(heatButton)
    expect(offButton).toHaveClass('MuiButton-contained')
    expect(coolButton).toHaveClass('MuiButton-contained')
    expect(heatButton).toHaveClass('MuiButton-containedPrimary')
    expect(fanButton).toHaveClass('MuiButton-contained')
    expect(autoButton).toHaveClass('MuiButton-contained')
})

test('click fan switch works', () => {
    const { container, getByTestId } = render(<ThermostatStatus />)
    const offButton = getByTestId("off-switch")
    const coolButton = getByTestId("cool-switch")
    const heatButton = getByTestId("heat-switch")
    const fanButton = getByTestId("fan-switch")
    const autoButton = getByTestId("auto-switch")
    fireEvent.click(fanButton)
    expect(offButton).toHaveClass('MuiButton-contained')
    expect(coolButton).toHaveClass('MuiButton-contained')
    expect(heatButton).toHaveClass('MuiButton-contained')
    expect(fanButton).toHaveClass('MuiButton-containedPrimary')
    expect(autoButton).toHaveClass('MuiButton-contained')
})

test('click auto switch works', () => {
    const { container, getByTestId } = render(<ThermostatStatus />)
    const offButton = getByTestId("off-switch")
    const coolButton = getByTestId("cool-switch")
    const heatButton = getByTestId("heat-switch")
    const fanButton = getByTestId("fan-switch")
    const autoButton = getByTestId("auto-switch")
    fireEvent.click(autoButton)
    expect(offButton).toHaveClass('MuiButton-contained')
    expect(coolButton).toHaveClass('MuiButton-contained')
    expect(heatButton).toHaveClass('MuiButton-contained')
    expect(fanButton).toHaveClass('MuiButton-contained')
    expect(autoButton).toHaveClass('MuiButton-containedPrimary')
})