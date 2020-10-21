from setuptools import find_packages, setup

setup(
    name='dynamodb',
    packages=find_packages(),
    version='0.1.70',
    description='DynamoDB CRUD functions',
    author='Me',
    license='MIT',
    install_requires=['boto3', 'dependency_injector==4.0.0'],
    setup_requires=['pytest-runner'],
    tests_require=['pytest==4.4.1'],
    test_suite='tests'
)