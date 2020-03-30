import React, { Component } from 'react';
import classlist from 'utils/classlist';
import './style.scss';

export interface IPwdRiskProps {
    password: string;
}

const riskPatterns: Array<[RegExp, number]> = [
    [/\d/, 0.5], // 数字
    [/[a-z]/, 0.5], // 小写字母
    [/[A-Z]/, 0.5], // 大写字母
    [/[^0-9a-zA-Z]/, 0.5] // 非数字、字母
];

/**
 * @description
 * 密码强度显示
 *
 * 密码强度判定规则
 * 纯数字: 0.5
 * 纯小写字母: 0.5
 * 纯大写字母: 0.5
 * 其它字符: 0.5
 */
class PwdRisk extends Component<IPwdRiskProps> {
    static defaultProps = {
        password: ''
    };

    static judgeRisk(pwd: string): number {
        const base = Math.min(pwd.length / 10, /^(.)\1*$/.test(pwd) ? 0.5 : 1); // 密码位数，每个字符占比0.1。如果是单一字符，最多0.5，否则最多1

        if (pwd.length <= 6 || /^(?:\d+|[a-z]+|[A-Z]+|(.)\1*)$/.test(pwd)) {
            // 密码长度太短，或者密码都是同一类型，不加权
            return base;
        }

        return riskPatterns.reduce((ret, [reg, num]) => (ret += reg.test(pwd) ? num : 0), base);
    }

    getPercent(num) {
        return Math.min(1, Math.max(num, 0));
    }

    public render() {
        const safety = PwdRisk.judgeRisk(this.props.password);

        return (
            <div
                className={classlist('pwd-risk-root', {
                    'pwd-risk-safety-0': safety <= 1,
                    'pwd-risk-safety-1': safety > 1 && safety <= 2,
                    'pwd-risk-safety-2': safety > 2
                })}>
                <div className="level-bar">
                    <div className="risk-level">
                        <span style={{ width: `${this.getPercent(safety) * 100}%` }} />
                    </div>
                    {__('弱')}
                </div>
                <div className="level-bar">
                    <div className="risk-level">
                        <span style={{ width: `${this.getPercent(safety - 1) * 100}%` }} />
                    </div>
                    {__('中')}
                </div>
                <div className="level-bar">
                    <div className="risk-level">
                        <span style={{ width: `${this.getPercent(safety - 2) * 100}%` }} />
                    </div>
                    {__('强')}
                </div>
            </div>
        );
    }
}

export default PwdRisk;
