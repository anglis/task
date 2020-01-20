import React from 'react';
import { shallow } from 'enzyme';

import { DetailViewContainer } from './index';

function flushPromises() {
  return new Promise(resolve => setImmediate(resolve));
}

describe('Test suite for detail view container', () => {
  it('should fetch problem on mount', () => {
    const mockGetProblem = jest.fn(() => Promise.resolve({}));
    shallow(<DetailViewContainer id='1' fetchProblemAction={mockGetProblem} />);

    expect(mockGetProblem).toBeCalledWith('1');
  });

  it('should set problem after successful fetch', async () => {
    const mockGetProblem = jest.fn(() => Promise.resolve({ data: { name: '1' } }));
    const wrapper = shallow(<DetailViewContainer id='1' fetchProblemAction={mockGetProblem} />);

    await flushPromises();
    wrapper.update();

    expect(wrapper.update().state('problem')).toEqual({ name: '1' });
  });

  it('should set success false after fetch', async () => {
    const mockGetProblem = jest.fn(() => Promise.resolve({ data: { name: '1' } }));
    const wrapper = shallow(<DetailViewContainer id='1' fetchProblemAction={mockGetProblem} />);

    await flushPromises();
    wrapper.update()

    expect(wrapper.state('fetching')).toBe(false);
  });
});