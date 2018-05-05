// Definition of actions

export const NUMBER_INPUT = 'NUMBER_INPUT'; // 数字输入
export const EVALUATION = 'EVALUATION'; // 求值
export const OPERATOR_INPUT = 'OPERATOR_INPUT'; // 操作符输入
export const FLOAT_POINT = 'FLOAT_POINT'; // 浮点数
// 四则运算
export const COMPUTE = {
  PLUS_MINUS: '±',
  ADD: '+',
  SUBTRACT: '-',
  MULTIPLY: 'x',
  DIVIDE: '÷'
}


// Action creator

export const input = number => ({
  type: NUMBER_INPUT,
  payload: {
    number: number
  }
});

export const operator = operator => ({
  type: OPERATOR_INPUT,
  payload: {
    operator: operator
  }
});

export const evaluate = () => ({
  type: EVALUATION
});

export const float = () => ({
  type: FLOAT_POINT
});
